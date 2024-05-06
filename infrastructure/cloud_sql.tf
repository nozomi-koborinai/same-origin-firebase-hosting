resource "google_sql_database_instance" "default" {
  name             = "my-cloudsql-instance"
  database_version = "POSTGRES_14"
  region           = "us-central1"

  settings {
    tier = "db-f1-micro"

    backup_configuration {
      enabled = false
    }

    ip_configuration {
      ipv4_enabled = true
    }
  }
}

resource "google_sql_database" "default" {
  name     = "sandbox_db"
  instance = google_sql_database_instance.default.name
}

resource "google_sql_user" "default" {
  name     = "my_user"
  instance = google_sql_database_instance.default.name
  password = "sandbox"
}
