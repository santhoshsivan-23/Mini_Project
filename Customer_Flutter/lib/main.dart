import 'package:flutter/material.dart';
import 'pages/qr_page.dart';
import 'pages/menu_page.dart';
import 'pages/order_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Restaurant App',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: '/qrs',
      routes: {
        '/qrs': (context) => const QrPage(),
        '/menu': (context) => const MenuPage(),
        '/orders': (context) => const OrderPage(),
      },
    );
  }
}
