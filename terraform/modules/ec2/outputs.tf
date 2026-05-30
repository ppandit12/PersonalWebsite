output "master_public_ip" {
  description = "The public Elastic IP of the Master node"
  value       = aws_eip.master_eip.public_ip
}

output "master_private_ip" {
  description = "The internal private IP of the Master node"
  value       = aws_instance.master.private_ip
}

output "worker_private_ips" {
  description = "The internal private IPs of the Worker nodes"
  value       = aws_instance.workers[*].private_ip
}

output "master_instance_id" {
  description = "The instance ID of the Master node"
  value       = aws_instance.master.id
}

output "worker_instance_ids" {
  description = "The instance IDs of the Worker nodes"
  value       = aws_instance.workers[*].id
}

output "ssh_private_key_path" {
  description = "Local path to the saved private key"
  value       = local_sensitive_file.private_key.filename
}
