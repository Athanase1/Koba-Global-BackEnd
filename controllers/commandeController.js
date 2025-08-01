import {transporter} from "../utils/mailService.js";
export const commandeConfirmation = async  (req, res) =>{
  const {infosClient, produits,total} = req.body;
  if (!infosClient || !produits || !total) {
    return res.status(400).json({ error: "Données manquantes" });
  }
  const listeProduits = produits;
  const html = `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Confirmation de commande</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
        margin: 0;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .header {
        background-color: #004080;
        padding: 20px;
        text-align: center;
      }
      .header img {
        max-width: 120px;
        margin-bottom: 10px;
      }
      .header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        margin: 10px 0;
        font-size: 16px;
      }
      .section {
        margin-bottom: 20px;
      }
      .section h3 {
        margin-bottom: 8px;
        color: #004080;
        font-size: 18px;
      }
      .footer {
        background-color: #eeeeee;
        padding: 15px;
        text-align: center;
        font-size: 14px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
       <h1 style="text-transform: capitalize; font-weight: bold; color: black; font-size: 20px">Distributions koba global inc</h1>
        <h1>Confirmation de commande</h1>
      </div>
      <div class="content">
        <p>Bonjour <strong>${infosClient.nomRes}</strong>,</p>
        <p>Votre commande a bien été reçue. Voici le récapitulatif :</p>
        <div class="section">
          <h3>🏪 Épicerie</h3>
          <p>${infosClient.nomEpic}</p>
        </div>

        <div class="section">
          <h3>📍 Adresse</h3>
          <p>${infosClient.addresse}</p>
        </div>

        <div class="section">
          <h3>📧 Email</h3>
          <p>${infosClient.email}</p>
        </div>

        <div class="section">
          <h3>📞 Téléphone</h3>
          <p>${infosClient.tel}</p>
        </div>

    <div class="section">
  <h3>🧾 Détails de la commande</h3>
  <table style="width:100%; border-collapse: collapse; background: #f9f9f9;">
    <thead>
      <tr>
        <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Nom</th>
        <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Quantité</th>
        <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Prix unitaire ($)</th>
      </tr>
    </thead>
    <tbody>
      ${listeProduits.map(p => `
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px;">${p.nom}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${p.qte}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">${p.prix.toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</div>


        <div class="section">
          <h3>💰 Total</h3>
          <p><strong>${total.toFixed(2)} $</strong></p>
        </div>
            <div class="section">
            <p>Nous vous contacteront sous peu pour completer la commande.</p>
            
        </div>
        <p>Merci de votre confiance !</p>
        <p>L’équipe de <strong>Distributions Kobal Global</strong>.</p>
      </div>
      <div class="footer">
  <h1>Nous contacter</h1>
  <h1>Tel: 581-578-4549</h1>
          <h1>Email: Distributionskobaglobainc@gmail.com</h1>
        © 2025 Distributions Kobal Global — Tous droits réservés.
      </div>
    </div>
  </body>
</html>
`;
  try {
      await transporter.sendMail({
          from:`"Distributions Kobal Global" <${process.env.MAIL_USER}>`,
          to:[infosClient.email, process.env.MAIL_USER],
          subject:"Confirmation de commande",
          html:html
      });
      return res.status(200).json({ success: true, message: "Commande reçue et email envoyé" });
  } catch (e) {
      return res.status(500).json({ error: "Erreur serveur" });
  }
}