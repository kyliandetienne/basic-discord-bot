# Bot Discord - Architecture de Développement

## 📖 À Propos

Ce projet contient l'**architecture complète** pour créer un bot Discord avec des commandes et une structure modulaire. Il s'agit d'un squelette prêt à être personnalisé pour vos besoins spécifiques.

C'est **uniquement l'architecture** - c'est-à-dire que les commandes présentées sont déjà codées et fonctionnelles, elles attendent juste d'être personnalisées selon vos besoins.

## 🏗️ Structure du Projet

```
├── index.js                 # Point d'entrée principal du bot
├── config.js                # Configuration centrale
├── .env                     # Variables d'environnement (à générer)
├── .env.example             # Modèles pour configuration
├── src/
│   └── Handlers/
│       ├── loadCommands.js           # Chargement des commandes classiques
│       ├── loadSlashCommands.js      # Chargement des commandes slash (/)
│       └── loadEvents.js             # Gestionnaires d'événements
└── package.json              # Dépendances npm

## 📋 Installation et Configuration

### Requiert Node.js 16.9 ou supérieur

1. **Cloner le dépôt et installer les dépendances :**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement :**
   - Créer un fichier `.env` basé sur `.env.example`
   - Remplacer les valeurs "placeholder" avec vos vraies informations Discord

3. **Lancer le bot :**
   ```bash
   node index.js
   ```

## ⚙️ Structure des Commandes

### Types de Commandes Supportés :

- **Slash Commands** (`/commande`) - Commandes modernes intégrées naturellement dans Discord
- **Regular Commands** (`;commande`) - Commandes traditionnelles avec prefixe (configureable en `PREFIX`)

### Architecture des Handlers :

| Handler | Fonction |
|---------|----------|
| `loadCommands.js` | Chargement des commandes slash classiques |
| `loadSlashCommands.js` | Gestion et mapping des commandes /slash Discord API |
| `loadEvents.js` | Gestionnaires d'événements (messages, erreurs, etc.) |

**Exemple de commande :**
```javascript
client.slashcommand.push(
  new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command')
    .run(async () => {
        await client.send({ content: 'Commande fonctionnelle !' });
    })
);
```

## 🎨 Personnalisation Rapide

| Paramètre | Emplacement | Description |
|-----------|-------------|-------------|
| `TOKEN` | `.env` | Token Discord de votre bot application |
| `PREFIX` | `/config.js` | Prefixe pour les commandes classiques |
| `GUILD_ID` | `.env` | ID du serveur (multi-servers: laissez vide) |
| `COLOR` | `config.js` | Couleur du embed du bot |
| `STAFF`, `WL` | `config.js` | IDs de modération/staff/whitelist |

## 🔐 Sécurité

⚠️ **IMPORTANT :** 
- Ne jamais commiter le fichier `.env` avec votre token réel dans Git
- Le fichier `.env` sera toujours être ignoré par `.gitignore`, ne pas modifier
- Votre token Discord est révélé via l'API Discord lors du premier `login()`

## 📦 Dépendances

Le projet utilise les paquets Discord.js et leurs composants :

- `discord.js@14.x` - Framework principal
- `@discordjs/builders` - Builders pour SlashCommands
- `@discordjs/rest` - REST API interactions
- `axios` - Requêtes HTTP

## 📞 Support

Besoin d'aide ? 
- Reportez vos questions sur mon serveur discord: https://discord.gg/cakYs9ZTaj

## ⚖️ Licence

ISC - voir [LICENSE](LICENSE) pour les détails.

---

**Remarque :** Ce bot est fourni tel quel avec tous les droits réservés - modifiez-le selon vos besoins !
