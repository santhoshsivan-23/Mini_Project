import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'order_detail_page.dart';

class OrdersPage extends StatefulWidget {
  const OrdersPage({super.key});

  @override
  State<OrdersPage> createState() => _OrdersPageState();
}

class _OrdersPageState extends State<OrdersPage> {
  List<dynamic> orders = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchOrders();
  }

  Future<void> fetchOrders() async {
    try {
      final data = await ApiService.getOrders();
      setState(() {
        orders = data;
        isLoading = false;
      });
    } catch (e) {
      print("Error fetching orders: $e");
    }
  }

  double calculateTotal(List<dynamic> items) {
    return items.fold<double>(
      0,
      (sum, item) =>
          sum +
          double.parse(item["product"]["price"].toString()) * item["quantity"],
    );
  }

  // Group orders by table id
  List<dynamic> ordersForTable(int tableId) {
    return orders.where((order) => order["table_id"] == tableId).toList();
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
      appBar: AppBar(title: const Text("Staff Orders")),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // ---- Orders List ----
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: orders.length,
                    itemBuilder: (context, index) {
                      final order = orders[index];
                      final total = calculateTotal(order["items"]);

                      return Card(
                        margin: const EdgeInsets.all(8),
                        child: ListTile(
                          title: Text(
                            "Order #${order["id"]} (Table ${order["table_id"]})",
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                          subtitle: Text(
                            "Status: ${order["status"]}",
                            style: TextStyle(
                              color: getStatusColor(order["status"]),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          trailing: Text(
                            "₹${total.toStringAsFixed(2)}",
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.green,
                            ),
                          ),
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => OrderDetailPage(order: order),
                              ),
                            );
                          },
                        ),
                      );
                    },
                  ),

                  const Divider(thickness: 2),
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Text(
                      "Tables Overview",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),

                  // ---- Table Full Width ----
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(8),
                    child: Table(
                      border: TableBorder.all(color: Colors.grey.shade300),
                      columnWidths: const {
                        0: FlexColumnWidth(),
                        1: FlexColumnWidth(),
                        2: FlexColumnWidth(),
                        3: FlexColumnWidth(),
                        4: FlexColumnWidth(),
                        5: FlexColumnWidth(),
                      },
                      children: [
                        // Header Row
                        TableRow(
                          decoration: BoxDecoration(
                            color: Colors.grey.shade200,
                          ),
                          children: List.generate(
                            6,
                            (index) => Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(
                                "Table ${index + 1}",
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                          ),
                        ),
                        ..._buildTableRows(),
                      ],
                    ),
                  ),
                ],
              ),
            ),
    );
  }

  // Build table rows dynamically with background colors
  List<TableRow> _buildTableRows() {
    int maxOrders = 0;
    for (int i = 1; i <= 6; i++) {
      maxOrders = [
        maxOrders,
        ordersForTable(i).length,
      ].reduce((a, b) => a > b ? a : b);
    }

    return List.generate(maxOrders, (rowIndex) {
      return TableRow(
        children: List.generate(6, (tableIndex) {
          final tableId = tableIndex + 1;
          final tableOrders = ordersForTable(tableId);

          if (rowIndex < tableOrders.length) {
            final order = tableOrders[rowIndex];

            // Assign background color based on status
            Color bgColor;
            switch (order["status"].toString().toLowerCase()) {
              case "pending":
                bgColor = Colors.orange.shade100;
                break;
              case "preparing":
                bgColor = Colors.blue.shade100;
                break;
              case "served":
                bgColor = Colors.green.shade100;
                break;
              default:
                bgColor = Colors.grey.shade100;
            }

            return GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => OrderDetailPage(order: order),
                  ),
                );
              },
              child: Container(
                padding: const EdgeInsets.all(8),
                alignment: Alignment.center,
                color: bgColor, // Background color here
                child: Text(
                  "Order #${order["id"]}\n(${order["status"]})",
                  style: const TextStyle(
                    color: Colors.black87,
                    fontWeight: FontWeight.w600,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            );
          } else {
            return const SizedBox.shrink();
          }
        }),
      );
    });
  }
}
