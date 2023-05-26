import "../common/main.tsp";
import "@azure-tools/typespec-client-generator-core";

using Cadl.MultiClient;
using Azure.ClientGenerator.Core;

// @doc("""
//   This is to show that if we don't do any customization. The client side should be able to call the api like
//   const client = new MultipleClient();
//   client.createOrUpdate()
//   client.get() 
//   client.createWithHeaders()
//   client.getArray()
//   """)