# ==========================================================
# Compute Resources (EC2) for Kubernetes Nodes
# ==========================================================

# 1. Fetch latest stable Ubuntu 22.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical owner ID

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# 2. Automatically generate a unique SSH Key Pair
resource "tls_private_key" "k8s_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "deployer" {
  key_name   = "${var.environment}-${var.key_name}"
  public_key = tls_private_key.k8s_key.public_key_openssh
}

# Save generated private key locally to disk for SSH administration
resource "local_sensitive_file" "private_key" {
  content         = tls_private_key.k8s_key.private_key_pem
  filename        = "${path.cwd}/${var.environment}-k8s-key.pem"
  file_permission = "0600"
}

# 3. K8s Master Node (Control Plane)
resource "aws_instance" "master" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = var.public_subnet_ids[0]
  key_name               = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [var.master_sg_id]

  # Root disk size matching kubernetes recommendation
  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  tags = {
    Name        = "${var.environment}-k8s-master"
    Role        = "master"
    Environment = var.environment
  }
}

# Elastic IP allocation and association for K8s Master Node
resource "aws_eip" "master_eip" {
  domain = "vpc"

  tags = {
    Name        = "${var.environment}-master-eip"
    Environment = var.environment
  }
}

resource "aws_eip_association" "master_assoc" {
  instance_id   = aws_instance.master.id
  allocation_id = aws_eip.master_eip.id
}

# 4. K8s Worker Nodes (2 Nodes)
resource "aws_instance" "workers" {
  count                  = 2
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = var.private_subnet_ids[count.index % length(var.private_subnet_ids)]
  key_name               = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [var.worker_sg_id]

  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  tags = {
    Name        = "${var.environment}-k8s-worker-${count.index + 1}"
    Role        = "worker"
    Environment = var.environment
  }
}
