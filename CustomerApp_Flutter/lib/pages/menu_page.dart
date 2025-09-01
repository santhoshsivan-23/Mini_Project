import 'package:flutter/material.dart';
import '../services/api_service.dart';

class MenuPage extends StatefulWidget {
  const MenuPage({super.key});

  @override
  State<MenuPage> createState() => _MenuPageState();
}

class _MenuPageState extends State<MenuPage> {
  List products = [];
  List<Map<String, dynamic>> cart = [];
  int tableId = 1;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final args = ModalRoute.of(context)!.settings.arguments as Map?;
    if (args != null && args.containsKey("tableId")) {
      tableId = args["tableId"];
    }
    fetchProducts();
  }

  void fetchProducts() async {
    final data = await ApiService.getProducts();
    setState(() => products = data);
  }

  double parsePrice(dynamic price) {
    if (price == null) return 0.0;
    if (price is int) return price.toDouble();
    if (price is double) return price;
    if (price is String) return double.tryParse(price) ?? 0.0;
    return 0.0;
  }

  void addToCart(product) {
    setState(() {
      final existingIndex = cart.indexWhere(
        (item) => item["id"] == product["id"],
      );
      if (existingIndex != -1) {
        cart[existingIndex]["quantity"] += 1;
      } else {
        cart.add({
          "id": product["id"],
          "name": product["name"],
          "price": parsePrice(product["price"]),
          "quantity": 1,
        });
      }
    });
  }

  void removeFromCart(int index) {
    setState(() {
      if (cart[index]["quantity"] > 1) {
        cart[index]["quantity"] -= 1;
      } else {
        cart.removeAt(index);
      }
    });
  }

  void placeOrder() async {
    if (cart.isEmpty) return;
    final success = await ApiService.placeOrder(tableId, cart);
    if (success) {
      setState(() => cart = []);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Order placed successfully!")),
      );
      Navigator.pushNamed(context, '/orders', arguments: {"tableId": tableId});
    }
  }

  double get total => cart.fold(0.0, (sum, item) {
    final price = (item["price"] as double);
    final qty = (item["quantity"] as int);
    return sum + price * qty;
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Menu - Table $tableId")),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(8),
              child: Column(
                children: [
                  // ✅ Products Grid
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: products.length,
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 4, // 4 products per row
                          crossAxisSpacing: 8,
                          mainAxisSpacing: 8,
                          childAspectRatio: 0.8,
                        ),
                    itemBuilder: (context, index) {
                      final p = products[index];
                      final price = parsePrice(p["price"]);
                      return GestureDetector(
                        onTap: () => addToCart(p),
                        child: Card(
                          elevation: 2,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Expanded(
                                child: p["image_url"] != null
                                    ? Image.network(
                                        p["image_url"], // ✅ FIXED HERE
                                        fit: BoxFit.cover,
                                        errorBuilder: (ctx, err, stack) =>
                                            const Icon(
                                              Icons.broken_image,
                                              color: Colors.red,
                                            ),
                                      )
                                    : const Icon(Icons.fastfood, size: 40),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(4.0),
                                child: Text(
                                  p["name"].toString(),
                                  textAlign: TextAlign.center,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              Text(
                                "₹$price",
                                style: const TextStyle(
                                  color: Colors.green,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(height: 4),
                            ],
                          ),
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 12),

                  // ✅ Cart Card
                  Card(
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            "Your Cart",
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Divider(),
                          if (cart.isEmpty)
                            const Center(
                              child: Padding(
                                padding: EdgeInsets.all(20.0),
                                child: Text(
                                  "Your cart is empty",
                                  style: TextStyle(color: Colors.grey),
                                ),
                              ),
                            )
                          else
                            ListView.builder(
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              itemCount: cart.length,
                              itemBuilder: (context, index) {
                                final item = cart[index];
                                return ListTile(
                                  title: Text(item["name"]),
                                  subtitle: Text(
                                    "₹${item["price"]} x ${item["quantity"]} = ₹${item["price"] * item["quantity"]}",
                                  ),
                                  trailing: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      IconButton(
                                        icon: const Icon(
                                          Icons.remove_circle,
                                          color: Colors.red,
                                        ),
                                        onPressed: () => removeFromCart(index),
                                      ),
                                      IconButton(
                                        icon: const Icon(
                                          Icons.add_circle,
                                          color: Colors.green,
                                        ),
                                        onPressed: () => addToCart(item),
                                      ),
                                    ],
                                  ),
                                );
                              },
                            ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 80), // space for bottom bar
                ],
              ),
            ),
          ),

          // ✅ Always visible bottom bar
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Total: ₹$total",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: cart.isNotEmpty
                        ? Colors.green
                        : Colors.grey,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 12,
                    ),
                  ),
                  icon: const Icon(Icons.check),
                  label: const Text("Place Order"),
                  onPressed: cart.isNotEmpty ? placeOrder : null,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
