import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  //static const String baseUrl = "http://127.0.0.1:8000/api"; // replace with your server IP

  static const String baseUrl =
      "http://http://51.21.219.234/api"; // replace with your server IP
  // Fetch all orders
  static Future<List<dynamic>> getOrders() async {
    final response = await http.get(Uri.parse("$baseUrl/orders"));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception("Failed to load orders");
    }
  }

  // Update order status
  static Future<void> updateOrderStatus(int orderId, String status) async {
    final response = await http.put(
      Uri.parse("$baseUrl/orders/$orderId"),
      body: {"status": status},
    );
    if (response.statusCode != 200) {
      throw Exception("Failed to update status");
    }
  }
}
