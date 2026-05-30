output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "The public subnet IDs"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "The private subnet IDs"
  value       = module.vpc.private_subnet_ids
}

output "k8s_master_public_ip" {
  description = "The public Elastic IP of the Kubernetes Master"
  value       = module.ec2.master_public_ip
}

output "k8s_master_private_ip" {
  description = "The private IP of the Kubernetes Master"
  value       = module.ec2.master_private_ip
}

output "k8s_workers_private_ips" {
  description = "The private IPs of the Kubernetes Workers"
  value       = module.ec2.worker_private_ips
}

output "ssh_private_key_path" {
  description = "Local path to the saved private key"
  value       = module.ec2.ssh_private_key_path
}
