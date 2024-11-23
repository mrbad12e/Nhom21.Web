import React from "react";
import GoogleStore from '@/assets/images/HomePage/GooglePlay.svg';
import AppStore from '@/assets/images/HomePage/AppStore.svg';
import QRCode from '@/assets/images/HomePage/qrcode.png';

const Footer = () => {
  return (
    <footer className="bg-black text-neutral-50 py-10">
      <div className="container mx-auto px-4 flex flex-wrap gap-10 justify-between">
        {/* Subscription Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Exclusive</h2>
          <p className="text-xl font-medium">Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className="flex border border-neutral-50 rounded px-4 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-neutral-50 outline-none flex-grow"
            />
            <button className="text-neutral-50 font-medium">Send</button>
          </div>
        </div>

        {/* Support Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">Support</h2>
          <p>1 Đ. Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
          <a href="mailto:someone@example.com">ecommerce@gmail.com</a>
          <a href="tel:+1800229933"> 098 765 4321</a>
        </div>

        {/* Account Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">Account</h2>
          <ul className="space-y-2">
            <li>My Account</li>
            <li> <a href="/login">Login / Register </a></li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">Quick Link</h2>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">Download App</h2>
          <p className="opacity-70 text-sm">Save $3 with App New User Only</p>
          <div className="flex gap-4">
            <img
              src={QRCode}
              alt="QR Code"
              className="w-[120px] h-[120px] border rounded-sm border-white"
            />
            <div className="flex flex-col gap-2">
              {/* App Store SVG */}
              <a className="w-full h-full" href="https://www.apple.com/vn/app-store/">
                <img src={AppStore}  alt="App Store" className="w-50% h-50%" />
              </a>
              {/* Google Play SVG */}
              <a className="w-full h-full" href="https://play.google.com/store/games?hl=vi-VN">
                <img src={GoogleStore} alt="Google Play" className="w-full h-full" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-neutral-50 mt-8 pt-4 text-center opacity-60">
        <p>© Copyright group21.WEB2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
