import 'package:flutter/material.dart';
import '../services/api_service.dart';

class OrderPage extends StatefulWidget {
  const OrderPage({super.key});

  @override
  State<OrderPage> createState() => _OrderPageState();
}

class _OrderPageState extends State<OrderPage> {
  List orders = [];
  int tableId = 1;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final args = ModalRoute.of(context)!.settings.arguments as Map;
    tableId = args["tableId"];
    fetchOrders();
  }

  void fetchOrders() async {
    final data = await ApiService.getOrders(tableId);
    setState(() => orders = data);
  }

  double parsePrice(dynamic price) {
    if (price == null) return 0.0;
    if (price is int) return price.toDouble();
    if (price is double) return price;
    if (price is String) return double.tryParse(price) ?? 0.0;
    return 0.0;
  }

  double calculateTotal(order) {
    double total = 0.0;
    for (var item in order["items"]) {
      final price = parsePrice(item["product"]["price"]);
      final qty = item["quantity"] as int;
      total += price * qty;
    }
    return total;
  }

  Color getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case "pending":
        return Colors.orange;
      case "preparing":
        return Colors.blue;
      case "served":
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Orders - Table $tableId")),
      body: ListView.builder(
        itemCount: orders.length,
        itemBuilder: (context, index) {
          final order = orders[index];
          final total = calculateTotal(order);
          final status = order["status"]?.toString() ?? "unknown";
          final statusColor = getStatusColor(status);

          return Card(
            margin: const EdgeInsets.all(8),
            child: ListTile(
              title: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Order #${order["id"]}"),
                  Text(
                    status,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: statusColor,
                    ),
                  ),
                ],
              ),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (var item in order["items"])
                    Text("${item["product"]["name"]} × ${item["quantity"]}"),
                  const SizedBox(height: 5),
                  Text(
                    "Total: ₹$total",
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.green,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
