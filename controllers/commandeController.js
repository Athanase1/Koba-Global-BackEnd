import { transporter } from "../utils/mailService.js";

export const traiterCommande = async (req, res) => {
  const { infosClient, produits, total } = req.body;

  if (!infosClient || !produits || !total) {
    return res.status(400).json({ error: "Données manquantes" });
  }
   console.log("Commande reçue :", infosClient, produits, total);

  const listeProduits = produits
    .map(p => `- ${p.nom} (x${p.qte}) : ${p.prix.toFixed(2)} $`)
    .join("\n");

  const message = `
Bonjour ${infosClient.nomRes},

Votre commande a bien été reçue. Voici le récapitulatif :

🏪 Épicerie : ${infosClient.nomEpic}
📍 Adresse : ${infosClient.addresse}
📧 Email : ${infosClient.email}
📞 Téléphone : ${infosClient.tel}

🧾 Détails de la commande :
${listeProduits}

💰 Total : ${total.toFixed(2)} $

Merci de votre confiance !

L’équipe de Distributions Kobal Global.
`;

  try {
    await transporter.sendMail({
      from: `"Distributions Kobal Global" <${process.env.MAIL_USER}>`,
      to: `${infosClient.email}, distributionskobaglobainc@gmail.com`,
      subject: "Confirmation de commande",
      text: message,
    });

    return res.status(200).json({ success: true, message: "Commande reçue et email envoyé" });
  } catch (error) {
    console.error("Erreur d’envoi de mail:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
