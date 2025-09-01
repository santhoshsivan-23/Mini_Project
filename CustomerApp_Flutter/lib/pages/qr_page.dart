import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';

class QrPage extends StatelessWidget {
  const QrPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Select Table QR")),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2, crossAxisSpacing: 12, mainAxisSpacing: 12,
        ),
        itemCount: 6,
        itemBuilder: (context, index) {
          final tableId = index + 1;
          final url = "http://localhost:5173/menu/$tableId"; // for React
          return GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/menu',
                  arguments: {"tableId": tableId});
            },
            child: Card(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  QrImageView(data: url, size: 120),
                  const SizedBox(height: 10),
                  Text("Table $tableId"),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
