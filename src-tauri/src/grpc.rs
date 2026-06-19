use tonic::Request;
// use tonic::transport::Channel;

pub mod mcp_client {
    tonic::include_proto!("ray.mcp_client"); // must match package name
}

use mcp_client::mcp_client_client::McpClientClient;
use mcp_client::GetToolsRequest;

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Connect to Python gRPC server
    let mut client = McpClientClient::connect("http://127.0.0.1:50051").await?;

    // Call method
    let request = Request::new(GetToolsRequest {});

    let response = client.get_tools(request).await?;

    let tools = response.into_inner().result;

    for tool in tools {
        println!("Description: {}", tool.description);

        // // inputSchema is a Struct -> dynamic JSON-like map
        // if let Some(schema) = tool.input_schema {
        //     println!("Schema: {:?}", schema);
        // }

        println!();
    }

    Ok(())
}