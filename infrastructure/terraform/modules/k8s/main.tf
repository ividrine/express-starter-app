

resource "civo_instance" "example" {
  hostname = "example-instance"
  size     = var.civo_instance_size
  region   = var.civo_region
}
