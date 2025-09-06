// On récupère les éléments HTML que l'on va manipuler
const photoInput = document.getElementById('photo-input');
const canvas = document.getElementById('canvas');
const downloadLink = document.getElementById('download-link');
const ctx = canvas.getContext('2d');

// Le nom de votre fichier de logo. Assurez-vous qu'il est dans le même dossier !
const logoSrc = '1000678223.jpg';

photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // On charge la photo de l'utilisateur
    const userImage = new Image();
    userImage.src = URL.createObjectURL(file);

    userImage.onload = () => {
        // On définit la taille du canvas en fonction de l'image de l'utilisateur
        canvas.width = userImage.width;
        canvas.height = userImage.height;

        // On dessine l'image de l'utilisateur sur le canvas
        ctx.drawImage(userImage, 0, 0);

        // On charge le logo "Alpha - Omega"
        const logoImage = new Image();
        logoImage.src = logoSrc;

        logoImage.onload = () => {
            // On définit la taille du logo (ajustez si besoin)
            const logoWidth = userImage.width * 0.2; // 20% de la largeur de la photo
            const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
            
            // On dessine le logo en bas à gauche de la photo (ajustez les coordonnées si besoin)
            ctx.drawImage(logoImage, 20, userImage.height - logoHeight - 20, logoWidth, logoHeight);

            // On ajoute le texte "J'y serai"
            ctx.font = 'bold ' + (userImage.width * 0.05) + 'px sans-serif'; // Taille de police
            ctx.fillStyle = '#FFFFFF'; // Couleur du texte (blanc)
            ctx.textAlign = 'right';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 5;
            
            // On dessine le texte en bas à droite de la photo
            ctx.fillText("J'y serai", userImage.width - 20, userImage.height - 20);

            // Une fois que tout est dessiné, on prépare le lien de téléchargement
            const imageDataURL = canvas.toDataURL('image/png');
            downloadLink.href = imageDataURL;
            downloadLink.style.display = 'block'; // On affiche le bouton de téléchargement
        };
    };
});
