variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs"
  type        = list(string)
}

variable "master_sg_id" {
  description = "The security group ID for the Master node"
  type        = string
}

variable "worker_sg_id" {
  description = "The security group ID for Worker nodes"
  type        = string
}

variable "instance_type" {
  description = "Instance size for both K8s Master and Workers"
  type        = string
  default     = "t3.medium" # Recommended minimum is t3.medium (2 vCPUs, 4GB RAM) for Kubeadm
}

variable "environment" {
  description = "Deployment environment name"
  type        = string
}

variable "key_name" {
  description = "Name of the SSH Key Pair to deploy"
  type        = string
  default     = "k8s-cluster-key"
}
