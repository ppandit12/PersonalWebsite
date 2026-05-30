variable "aws_region" {
  description = "The AWS region to deploy the resources in"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "The deployment environment name"
  type        = string
  default     = "dev"
}

variable "admin_ip" {
  description = "The administrative IP address block allowed to SSH into nodes"
  type        = string
  default     = "0.0.0.0/0"
}

variable "instance_type" {
  description = "Instance size for Kubernetes master and worker nodes"
  type        = string
  default     = "t3.medium"
}
