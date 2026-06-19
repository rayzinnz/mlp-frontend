fn main() {
    tonic_prost_build::compile_protos("proto/mcp_client.proto").unwrap();
    tauri_build::build()
}
