In build.rs:

```rust
fn main() {
    tonic_build::compile_protos("proto/mcp_client.proto").unwrap();
    tauri_build::build()
}
```

**requires protoc**
https://docs.rs/prost-build/latest/prost_build/#sourcing-protoc
https://github.com/protocolbuffers/protobuf#protocol-compiler-installation
https://github.com/protocolbuffers/protobuf/releases
https://github.com/protocolbuffers/protobuf/releases/download/v35.1/protoc-35.1-win64.zip

 - Add to path
C:\Users\hrag\Software\protobuf

