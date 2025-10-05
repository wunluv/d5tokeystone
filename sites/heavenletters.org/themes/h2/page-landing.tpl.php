<?php
// $Id$
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="<?php print $language->language ?>" xml:lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">

<head>
  <title><?php print $head_title ?></title>
  <?php print $head ?>
  <?php print $styles ?>
  <?php print $scripts ?>
</head>

<body class="landing-page">

  <div id="header-region" class="header-landing">
    <div class="container mx-auto">
        <?php print $header; ?>
    </div>
  </div>

  <main id="main-content" class="bg-gray-50">

    <!-- Hero Section -->
    <section id="hero-section" class="bg-blue-600 text-white text-center py-20">
      <div class="container mx-auto">
        <h1 title="Main hero heading" class="text-5xl font-bold mb-4">Unlock Your Inner Wisdom</h1>
        <h2 title="Hero subheading" class="text-2xl font-light mb-8">Discover timeless guidance and inspiration from Heavenletters.</h2>
        <a href="#" class="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">Start Your Journey</a>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features-section" class="py-20">
      <div class="container mx-auto text-center">
        <h2 title="Features section heading" class="text-3xl font-bold text-gray-800 mb-12">Why Choose Heavenletters?</h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div class="feature-card">
            <div class="mb-4">
              <!-- Placeholder for an icon -->
              <i data-feather="plus" class="w-16 h-16 mx-auto text-blue-500"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Daily Inspiration</h3>
            <p class="text-gray-600">Receive a new, uplifting message every day to guide and enlighten you.</p>
          </div>
          <div class="feature-card">
            <div class="mb-4">
              <!-- Placeholder for an icon -->
              <i data-feather="search" class="w-16 h-16 mx-auto text-blue-500"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Searchable Archive</h3>
            <p class="text-gray-600">Explore thousands of letters on any topic you can imagine.</p>
          </div>
          <div class="feature-card">
            <div class="mb-4">
              <!-- Placeholder for an icon -->
              <i data-feather="heart" class="w-16 h-16 mx-auto text-blue-500"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">Community Connection</h3>
            <p class="text-gray-600">Join a global community of readers finding peace and wisdom.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials-section" class="bg-white py-20">
        <div class="container mx-auto">
            <h2 title="Testimonials section heading" class="text-3xl font-bold text-center text-gray-800 mb-12">Words from Our Readers</h2>
            <div class="grid md:grid-cols-2 gap-8">
                <?php /* The testimonials will be rendered here, likely from a Drupal block or view. */ ?>
                <?php if ($testimonials): ?>
                    <?php print $testimonials; ?>
                <?php else: ?>
                    <!-- Fallback content if no testimonials are loaded -->
                    <div class="testimonial bg-gray-100 p-8 rounded-lg shadow">
                        <p class="text-gray-700 mb-4">"Heavenletters has been a source of profound comfort and wisdom in my life. I am so grateful for these daily messages."</p>
                        <p class="font-semibold text-gray-800">- A Grateful Reader</p>
                    </div>
                    <div class="testimonial bg-gray-100 p-8 rounded-lg shadow">
                        <p class="text-gray-700 mb-4">"I start my day with Heavenletters. It sets a positive and reflective tone that carries me through the day."</p>
                        <p class="font-semibold text-gray-800">- Longtime Subscriber</p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- Final CTA Section -->
    <section id="final-cta-section" class="bg-blue-600 text-white text-center py-20">
      <div class="container mx-auto">
        <h2 title="Final CTA heading" class="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
        <p class="text-xl font-light mb-8">Join thousands of readers on a journey of self-discovery and spiritual growth.</p>
        <a href="#" class="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">Subscribe Now</a>
      </div>
    </section>

  </main>

  <div id="footer" class="bg-gray-800 text-white py-8">
    <div class="container mx-auto text-center">
      <?php if (!empty($footer_message)): ?>
        <div id="footer-message" class="footer-message">
          <?php print $footer_message ?>
        </div>
      <?php endif; ?>
      <?php print $footer ?>
    </div>
  </div>

  <?php print $closure ?>

</body>
</html>