import 'package:flutter/material.dart';
import '../services/api_service.dart';

class OrderDetailPage extends StatefulWidget {
  final Map<String, dynamic> order;
  const OrderDetailPage({super.key, required this.order});

  @override
  State<OrderDetailPage> createState() => _OrderDetailPageState();
}

class _OrderDetailPageState extends State<OrderDetailPage> {
  late Map<String, dynamic> order;

  @override
  void initState() {
    super.initState();
    order = widget.order;
  }

  Future<void> updateStatus(int orderId, String status) async {
    try {
      await ApiService.updateOrderStatus(orderId, status);
      setState(() {
        order["status"] = status;
      });
    } catch (e) {
      print("Error updating status: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    final items = order["items"] as List<dynamic>;
    final total = items.fold<double>(
      0,
      (sum, item) =>
          sum +
          double.parse(item["product"]["price"].toString()) * item["quantity"],
    );

    return Scaffold(
      appBar: AppBar(title: Text("Order #${order["id"]} Details")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Table: ${order["table_id"]}",
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 10),
            Text(
              "Status: ${order["status"]}",
              style: const TextStyle(fontSize: 16),
            ),

            const SizedBox(height: 20),
            const Text(
              "Items:",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),

            ...items.map(
              (item) => ListTile(
                title: Text(item["product"]["name"]),
                subtitle: Text("Qty: ${item["quantity"]}"),
                trailing: Text(
                  "₹${(double.parse(item["product"]["price"].toString()) * item["quantity"]).toStringAsFixed(2)}",
                ),
              ),
            ),

            const Divider(),
            Text(
              "Total: ₹${total.toStringAsFixed(2)}",
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 20),

            // Dropdown to update status
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("Update Status:"),
                DropdownButton<String>(
                  value: order["status"],
                  items: ["pending", "preparing", "served"]
                      .map(
                        (status) => DropdownMenuItem(
                          value: status,
                          child: Text(status),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    if (value != null) {
                      updateStatus(order["id"], value);
                    }
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
