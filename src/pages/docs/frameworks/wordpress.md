---
title: WordPress Integration
layout: "../../../layouts/DocsLayout.astro"
---

# WordPress Integration

Integrate Infinity Metrics with WordPress websites using multiple methods depending on your setup and requirements.

## Method 1: Theme Integration (Recommended)

### Add to Theme Files

**1. Add tracking script to your theme's `functions.php`:**

```php
// functions.php
function add_infinity_metrics_script() {
    if (!is_admin()) {
        ?>
        <script defer src="https://your-domain.com/api/v1/sdk.js"></script>
        <?php
    }
}
add_action('wp_head', 'add_infinity_metrics_script');
```

**2. Or add directly to `header.php`:**

```php
<!-- header.php - before closing </head> tag -->
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

### Custom Event Tracking

Add custom event tracking for WordPress-specific actions:

```php
// functions.php
function infinity_metrics_custom_events() {
    if (!is_admin()) {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.InfinityMetrics !== 'undefined') {
                // Track page type
                <?php if (is_home() || is_front_page()): ?>
                InfinityMetrics.sendCustomEvent('page_view', { page_type: 'homepage' });
                <?php elseif (is_single()): ?>
                InfinityMetrics.sendCustomEvent('page_view', { 
                    page_type: 'post',
                    post_id: <?php echo get_the_ID(); ?>,
                    category: '<?php echo get_the_category()[0]->name ?? 'uncategorized'; ?>'
                });
                <?php elseif (is_page()): ?>
                InfinityMetrics.sendCustomEvent('page_view', { 
                    page_type: 'page',
                    page_id: <?php echo get_the_ID(); ?>
                });
                <?php endif; ?>
                
                // Track comment form interactions
                const commentForm = document.getElementById('commentform');
                if (commentForm) {
                    commentForm.addEventListener('submit', function() {
                        InfinityMetrics.sendCustomEvent('comment_submitted', {
                            post_id: <?php echo get_the_ID(); ?>
                        });
                    });
                }
            }
        });
        </script>
        <?php
    }
}
add_action('wp_footer', 'infinity_metrics_custom_events');
```

## Method 2: Plugin Installation

### Using Code Injection Plugins

**1. Install a code injection plugin like "Insert Headers and Footers"**

**2. Add the tracking script to the header section:**

```html
<script defer src="https://your-domain.com/api/v1/sdk.js"></script>
```

**3. Add custom event tracking to the footer section:**

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.InfinityMetrics !== 'undefined') {
        // Track WordPress-specific events
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function() {
                InfinityMetrics.sendCustomEvent('search_performed', {
                    search_query: searchForm.querySelector('input[type="search"]').value
                });
            });
        }
    }
});
</script>
```

## WooCommerce Integration

### E-commerce Event Tracking

```php
// functions.php - WooCommerce specific tracking
function woocommerce_infinity_metrics() {
    if (!is_admin() && class_exists('WooCommerce')) {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.InfinityMetrics !== 'undefined') {
                
                // Track product views
                <?php if (is_product()): ?>
                    <?php $product = wc_get_product(get_the_ID()); ?>
                    InfinityMetrics.sendCustomEvent('product_viewed', {
                        product_id: '<?php echo $product->get_id(); ?>',
                        product_name: '<?php echo esc_js($product->get_name()); ?>',
                        category: '<?php echo esc_js(wp_get_post_terms($product->get_id(), 'product_cat')[0]->name ?? 'uncategorized'); ?>',
                        price: <?php echo $product->get_price(); ?>
                    });
                <?php endif; ?>
                
                // Track add to cart
                document.addEventListener('click', function(e) {
                    if (e.target.classList.contains('add_to_cart_button')) {
                        const productId = e.target.getAttribute('data-product_id');
                        InfinityMetrics.sendCustomEvent('add_to_cart_clicked', {
                            product_id: productId
                        });
                    }
                });
            }
        });
        </script>
        <?php
    }
}
add_action('wp_footer', 'woocommerce_infinity_metrics');

// Track successful purchases
function track_woocommerce_purchase($order_id) {
    $order = wc_get_order($order_id);
    if ($order) {
        ?>
        <script>
        if (typeof window.InfinityMetrics !== 'undefined') {
            InfinityMetrics.registerPurchase(
                <?php echo $order->get_total() * 100; ?>, // Convert to cents
                '<?php echo $order->get_currency(); ?>',
                {
                    order_id: '<?php echo $order_id; ?>',
                    item_count: <?php echo $order->get_item_count(); ?>,
                    payment_method: '<?php echo esc_js($order->get_payment_method()); ?>'
                }
            );
        }
        </script>
        <?php
    }
}
add_action('woocommerce_thankyou', 'track_woocommerce_purchase');
```

## Contact Form 7 Integration

Track form submissions and interactions:

```php
// functions.php
function cf7_infinity_metrics_tracking() {
    if (!is_admin()) {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.InfinityMetrics !== 'undefined') {
                // Track form submissions
                document.addEventListener('wpcf7mailsent', function(event) {
                    InfinityMetrics.sendCustomEvent('contact_form_submitted', {
                        form_id: event.detail.contactFormId,
                        form_title: event.detail.inputs.find(input => input.name === 'your-subject')?.value || 'Contact Form'
                    });
                });
                
                // Track form errors
                document.addEventListener('wpcf7invalid', function(event) {
                    InfinityMetrics.sendCustomEvent('contact_form_error', {
                        form_id: event.detail.contactFormId
                    });
                });
            }
        });
        </script>
        <?php
    }
}
add_action('wp_footer', 'cf7_infinity_metrics_tracking');
```

## Gutenberg Block Tracking

Track interactions with specific Gutenberg blocks:

```php
// functions.php
function gutenberg_block_tracking() {
    if (!is_admin()) {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.InfinityMetrics !== 'undefined') {
                // Track button clicks in blocks
                document.querySelectorAll('.wp-block-button__link').forEach(function(button) {
                    button.addEventListener('click', function() {
                        InfinityMetrics.sendCustomEvent('gutenberg_button_clicked', {
                            button_text: this.textContent.trim(),
                            page_id: <?php echo get_the_ID(); ?>
                        });
                    });
                });
                
                // Track gallery interactions
                document.querySelectorAll('.wp-block-gallery img').forEach(function(img) {
                    img.addEventListener('click', function() {
                        InfinityMetrics.sendCustomEvent('gallery_image_clicked', {
                            image_alt: this.alt,
                            page_id: <?php echo get_the_ID(); ?>
                        });
                    });
                });
            }
        });
        </script>
        <?php
    }
}
add_action('wp_footer', 'gutenberg_block_tracking');
```

## Custom Post Type Tracking

Track views and interactions with custom post types:

```php
// functions.php
function custom_post_type_tracking() {
    if (!is_admin() && is_singular()) {
        $post_type = get_post_type();
        if ($post_type !== 'post' && $post_type !== 'page') {
            ?>
            <script>
            if (typeof window.InfinityMetrics !== 'undefined') {
                InfinityMetrics.sendCustomEvent('custom_post_viewed', {
                    post_type: '<?php echo esc_js($post_type); ?>',
                    post_id: <?php echo get_the_ID(); ?>,
                    post_title: '<?php echo esc_js(get_the_title()); ?>'
                });
            }
            </script>
            <?php
        }
    }
}
add_action('wp_footer', 'custom_post_type_tracking');
```

## WordPress Multisite

For WordPress multisite networks:

```php
// mu-plugins/infinity-metrics.php
function multisite_infinity_metrics() {
    if (!is_admin()) {
        $site_id = get_current_blog_id();
        $site_details = get_blog_details($site_id);
        ?>
        <script defer src="https://your-domain.com/api/v1/sdk.js"></script>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.InfinityMetrics !== 'undefined') {
                InfinityMetrics.sendCustomEvent('page_view', {
                    site_id: <?php echo $site_id; ?>,
                    site_name: '<?php echo esc_js($site_details->blogname); ?>',
                    network_site: true
                });
            }
        });
        </script>
        <?php
    }
}
add_action('wp_head', 'multisite_infinity_metrics');
```

## Performance Optimization

### Conditional Loading

```php
// functions.php - Only load on public pages
function conditional_infinity_metrics() {
    // Don't load on admin, login, or preview pages
    if (is_admin() || is_preview() || wp_is_mobile() && is_feed()) {
        return;
    }
    
    // Don't load for bots
    if (isset($_SERVER['HTTP_USER_AGENT']) && 
        preg_match('/bot|crawl|slurp|spider|mediapartners/i', $_SERVER['HTTP_USER_AGENT'])) {
        return;
    }
    
    ?>
    <script defer src="https://your-domain.com/api/v1/sdk.js"></script>
    <?php
}
add_action('wp_head', 'conditional_infinity_metrics');
```

### Cache Compatibility

If using caching plugins, ensure the tracking script is excluded from caching or use server-side configuration to inject the script.

## Privacy and Compliance

### GDPR Compliance

```php
// functions.php
function gdpr_compliant_analytics() {
    // Check if user has consented (example using a cookie consent plugin)
    if (function_exists('has_user_consented_to_analytics') && !has_user_consented_to_analytics()) {
        return;
    }
    
    ?>
    <script defer src="https://your-domain.com/api/v1/sdk.js"></script>
    <?php
}
add_action('wp_head', 'gdpr_compliant_analytics');
```

## Troubleshooting

### Common Issues

1. **Script not loading**: Check if other plugins are blocking the script
2. **Events not tracking**: Verify JavaScript console for errors
3. **Duplicate tracking**: Ensure script is only loaded once
4. **Cache issues**: Clear cache after implementing changes

### Debug Mode

```php
// functions.php - Enable debug mode
function infinity_metrics_debug() {
    if (current_user_can('administrator') && isset($_GET['debug_analytics'])) {
        ?>
        <script>
        window.InfinityMetrics = window.InfinityMetrics || {};
        window.InfinityMetrics.config = { debug: true };
        </script>
        <?php
    }
}
add_action('wp_head', 'infinity_metrics_debug');
```

This WordPress integration provides comprehensive tracking capabilities while maintaining compatibility with popular plugins and themes.