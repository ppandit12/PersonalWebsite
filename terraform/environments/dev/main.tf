# ==========================================================
# Dev Environment Root Configuration
# ==========================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1. Instantiate VPC Module
module "vpc" {
  source               = "../../modules/vpc"
  vpc_cidr             = "10.0.0.0/16"
  public_subnet_cidrs  = ["10.0.1.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.11.0/24"]
  availability_zones   = ["${var.aws_region}a", "${var.aws_region}b"]
  environment          = var.environment
}

# 2. Instantiate Security Groups Module
module "security_groups" {
  source      = "../../modules/security_groups"
  vpc_id      = module.vpc.vpc_id
  vpc_cidr    = module.vpc.vpc_cidr_block
  environment = var.environment
  admin_ip    = var.admin_ip
}

# 3. Instantiate Compute (EC2) Module
module "ec2" {
  source             = "../../modules/ec2"
  public_subnet_ids  = module.vpc.public_subnet_ids
  private_subnet_ids = module.vpc.private_subnet_ids
  master_sg_id       = module.security_groups.master_sg_id
  worker_sg_id       = module.security_groups.worker_sg_id
  instance_type      = var.instance_type
  environment        = var.environment
}

# 4. Automate Ansible Inventory Generation upon Terraform Apply
resource "local_file" "ansible_inventory" {
  filename = "${path.cwd}/../../../ansible/inventory/hosts.yaml"
  content  = <<EOT
all:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: "../terraform/environments/dev/${var.environment}-k8s-key.pem"
    ansible_ssh_common_args: '-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null'
  children:
    master:
      hosts:
        k8s-master:
          ansible_host: ${module.ec2.master_public_ip}
          internal_ip: ${module.ec2.master_private_ip}
    workers:
      hosts:
        k8s-worker-1:
          ansible_host: ${module.ec2.worker_private_ips[0]}
          internal_ip: ${module.ec2.worker_private_ips[0]}
        k8s-worker-2:
          ansible_host: ${module.ec2.worker_private_ips[1]}
          internal_ip: ${module.ec2.worker_private_ips[1]}
EOT
}
