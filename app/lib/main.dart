import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(const MasterRoboticsApp());
}

/// Master Robotics book as a fully offline mobile app.
///
/// The whole static book (same HTML/CSS/JS as the web edition) is bundled
/// under assets/book/ by `tool/sync_book.py` and rendered in a WebView —
/// no server, no online URL, works in airplane mode.
class MasterRoboticsApp extends StatelessWidget {
  const MasterRoboticsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Master Robotics',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF2D5BFF)),
        useMaterial3: true,
      ),
      home: const BookReaderPage(),
    );
  }
}

class BookReaderPage extends StatefulWidget {
  const BookReaderPage({super.key});

  @override
  State<BookReaderPage> createState() => _BookReaderPageState();
}

class _BookReaderPageState extends State<BookReaderPage> {
  late final WebViewController _controller;
  bool _firstLoadDone = false;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFFF6F7FB))
      ..setNavigationDelegate(
        NavigationDelegate(
          // Keep bundled chapter links inside the reader; open real web
          // links (fonts CDN aside) in the system browser.
          onNavigationRequest: (request) async {
            final uri = Uri.tryParse(request.url);
            final isAsset = request.url.startsWith('file://') ||
                request.url.contains('flutter_assets') ||
                request.url.startsWith('https://localhost') ||
                request.url.startsWith('about:') ||
                (uri != null && (uri.scheme.isEmpty || uri.scheme == 'file'));
            if (!isAsset && uri != null && (uri.scheme == 'http' || uri.scheme == 'https')) {
              if (await canLaunchUrl(uri)) {
                await launchUrl(uri, mode: LaunchMode.externalApplication);
              }
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
          onPageFinished: (_) {
            if (mounted && !_firstLoadDone) {
              setState(() => _firstLoadDone = true);
            }
          },
        ),
      )
      ..loadFlutterAsset('assets/book/index.html');
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      // Android back button walks back through chapters first.
      canPop: false,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;
        if (await _controller.canGoBack()) {
          await _controller.goBack();
        } else if (context.mounted) {
          Navigator.of(context).maybePop();
        }
      },
      child: Scaffold(
        body: SafeArea(
          // The book draws its own top bar; SafeArea only guards notches.
          top: false,
          child: Stack(
            children: [
              WebViewWidget(controller: _controller),
              if (!_firstLoadDone)
                const Center(child: CircularProgressIndicator()),
            ],
          ),
        ),
      ),
    );
  }
}
