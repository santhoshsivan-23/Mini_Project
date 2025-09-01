// // import 'dart:convert';
// // import 'package:http/http.dart' as http;

// // class ApiService {
// //   static const baseUrl = "http://127.0.0.1:8000/api";

// //   static Future<List> getProducts() async {
// //     final res = await http.get(Uri.parse("$baseUrl/products"));
// //     if (res.statusCode == 200) {
// //       return jsonDecode(res.body);
// //     }
// //     return [];
// //   }

// //   static Future<bool> placeOrder(int tableId, List cart) async {
// //     final items = cart
// //         .map((c) => {"product_id": c["id"], "quantity": c["quantity"]})
// //         .toList();

// //     final res = await http.post(
// //       Uri.parse("$baseUrl/orders"),
// //       headers: {"Content-Type": "application/json"},
// //       body: jsonEncode({"table_id": tableId, "items": items}),
// //     );

// //     return res.statusCode == 201;
// //   }

// //   static Future<List> getOrders(int tableId) async {
// //     final res = await http.get(Uri.parse("$baseUrl/orders?table_id=$tableId"));
// //     if (res.statusCode == 200) {
// //       return jsonDecode(res.body);
// //     }
// //     return [];
// //   }
// // }

// import 'dart:convert';
// import 'package:http/http.dart' as http;

// class ApiService {
//   static const baseUrl = "http://127.0.0.1:8000/api";

//   static Future<List> getProducts() async {
//     final res = await http.get(Uri.parse("$baseUrl/products"));
//     if (res.statusCode == 200) {
//       return jsonDecode(res.body);
//     }
//     return [];
//   }

//   static Future<bool> placeOrder(int tableId, List cart) async {
//     final items = cart
//         .map((c) => {"product_id": c["id"], "quantity": c["quantity"]})
//         .toList();

//     final res = await http.post(
//       Uri.parse("$baseUrl/orders"),
//       headers: {"Content-Type": "application/json"},
//       body: jsonEncode({"table_id": tableId, "items": items}),
//     );

//     return res.statusCode == 201;
//   }

//   static Future<List> getOrders(int tableId) async {
//     final res = await http.get(Uri.parse("$baseUrl/orders?table_id=$tableId"));
//     if (res.statusCode == 200) {
//       return jsonDecode(res.body);
//     }
//     return [];
//   }
// }

import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  //static const baseUrl = "http://127.0.0.1:8000/api";

  static const baseUrl = "http://10.0.2.2:8000/api";

  /// ✅ Get products with image_url
  static Future<List> getProducts() async {
    final res = await http.get(Uri.parse("$baseUrl/products"));
    if (res.statusCode == 200) {
      final data = jsonDecode(res.body) as List;
      return data;
    }
    return [];
  }

  /// ✅ Place order
  static Future<bool> placeOrder(int tableId, List cart) async {
    final items = cart
        .map((c) => {"product_id": c["id"], "quantity": c["quantity"]})
        .toList();

    final res = await http.post(
      Uri.parse("$baseUrl/orders"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"table_id": tableId, "items": items}),
    );

    return res.statusCode == 201;
  }

  /// ✅ Get orders by table
  static Future<List> getOrders(int tableId) async {
    final res = await http.get(Uri.parse("$baseUrl/orders?table_id=$tableId"));
    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    }
    return [];
  }
}
