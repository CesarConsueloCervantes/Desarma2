'use client';

import { useCart } from '@/store/provider';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import jsPDF from 'jspdf';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [ticketGenerated, setTicketGenerated] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleGenerateTicket = () => {
    if (cartItems.length === 0) return alert('El carrito está vacío');
    setTicketGenerated(true);
  };

  const handleClearCart = () => {
    clearCart();
    setTicketGenerated(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString();

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    doc.addImage('/pdf.png', 'PNG', 140, 10, 50, 20);
    doc.text('RepairShop - Ticket de Compra', 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${today}`, 20, 28);

    let y = 40;
    cartItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} x${item.quantity} = $${item.price * item.quantity}`,
        20,
        y
      );
      y += 10;
    });

    doc.setFontSize(14);
    doc.text(`Total pagado: $${totalPrice}`, 20, y + 10);

    doc.save('ticket_coolpanda.pdf');
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center text-sky-400">
            🛍️ Tu carrito
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-slate-400 text-center">Tu carrito está vacío.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-slate-800 p-4 rounded shadow-md hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-sky-300">
                      {item.name}
                    </h2>
                    <p className="text-slate-400">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sky-200 font-medium">
                      ${item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-pink-400 hover:underline text-sm mt-1"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-bold text-sky-200">
              Total: ${totalPrice}
            </p>
            <div className="space-x-4">
              <button
                onClick={handleGenerateTicket}
                className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded transition"
              >
                Generar Ticket
              </button>
              <button
                onClick={handleClearCart}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
              >
                Vaciar
              </button>
            </div>
          </div>

          {ticketGenerated && (
            <div className="bg-green-800 p-4 rounded shadow-md text-green-100">
              <h2 className="text-2xl font-bold mb-2">🎟️ Ticket generado</h2>
              <ul className="space-y-1 mb-2">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.name} x{item.quantity} = ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="font-semibold mb-4">
                Total pagado: ${totalPrice}
              </p>
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
              >
                Descargar Ticket PDF
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}