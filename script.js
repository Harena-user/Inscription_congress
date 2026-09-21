const SUPABASE_URL = "https://chbdlfwkfxwbiktcvdiz.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYmRsZndrZnh3YmlrdGN2ZGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MjA3NzgsImV4cCI6MjEwNTQ5Njc3OH0.7Uf-eSlky49OtEKQFCUEnKzt0LnzOOxCnO9z9a0SM0g";


// Création du client Supabase

let supabaseClient = null; 
if ( 
  SUPABASE_URL && SUPABASE_KEY && window.supabase 
  ) {
    
    supabaseClient =
     window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );
  }

// ======================================================
// RÉCUPÉRATION DES ÉLÉMENTS HTML
// ======================================================

const form =
    document.getElementById("registrationForm");

const submitButton =
    document.getElementById("submitButton");

const formMessage =
    document.getElementById("formMessage");

const fonctionSelect =
    document.getElementById("fonction");

const autreFonctionGroup =
    document.getElementById("autreFonctionGroup");

const autreFonction =
    document.getElementById("autreFonction");

const fraisInscription =
    document.getElementById("fraisInscription");

const montantInscription =
    document.getElementById("montantInscription");


// ======================================================
// CHAMPS DU FORMULAIRE
// ======================================================

const fields = [
    "nom",
    "prenoms",
    "email",
    "telephone",
    "fonction"
];


// ======================================================
// NETTOYAGE DU TEXTE
// ======================================================

function cleanText(value) {

    return value
        .trim()
        .replace(/\s+/g, " ");
}


// ======================================================
// AFFICHER UNE ERREUR
// ======================================================

function setError(fieldName, message) {

    const field =
        document.getElementById(fieldName);

    const error =
        document.getElementById(
            fieldName + "Error"
        );


    field.classList.add("invalid");

    field.setAttribute(
        "aria-invalid",
        "true"
    );

    error.textContent = message;
}


// ======================================================
// SUPPRIMER UNE ERREUR
// ======================================================

function clearError(fieldName) {

    const field =
        document.getElementById(fieldName);

    const error =
        document.getElementById(
            fieldName + "Error"
        );


    field.classList.remove("invalid");

    field.setAttribute(
        "aria-invalid",
        "false"
    );

    error.textContent = "";
}


// ======================================================
// VALIDATION EMAIL
// ======================================================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );
}


// ======================================================
// VALIDATION TÉLÉPHONE
// ======================================================
// Accepte par exemple : 034 00 000 00; 0340000000
// Accepte le numéro de fixe: 020 00 000 00
// Accepte l'insertion de l'indicatif international +261

function isValidPhone(phone) {

    const digits = phone.replace(/\D/g, "");

    return /^(?:0|261)(20|3[2345789])\d{7}$/.test(digits);
}

// ======================================================
// GESTION DU TARIF
// ======================================================

function updateRegistrationFee() {

    const selectedFunction =
        fonctionSelect.value;


    // Médecin / Chirurgien dentiste

    if (
        selectedFunction ===
        "Médecin/Chirurgien dentiste"
    ) {

        montantInscription.textContent =
            "30.000 AR";

        fraisInscription.classList.remove(
            "hidden"
        );

        return;
    }


    // Infirmier(e)

    if (
        selectedFunction ===
        "Infirmier(e)"
    ) {

        montantInscription.textContent =
            "10.000 AR";

        fraisInscription.classList.remove(
            "hidden"
        );

        return;
    }


    // Étudiant

    if (
        selectedFunction ===
        "Étudiant"
    ) {

        montantInscription.textContent =
            "10.000 AR";

        fraisInscription.classList.remove(
            "hidden"
        );

        return;
    }


    // Autres

    if (
        selectedFunction ===
        "Autres"
    ) {

        montantInscription.textContent =
            "aucun paiement à effectuer.";

        fraisInscription.classList.remove(
            "hidden"
        );

        return;
    }
    
    // Aucune sélection

    fraisInscription.classList.add(
        "hidden"
    );

    montantInscription.textContent = "";
}


// ======================================================
// GESTION DE "AUTRES"
// ======================================================

function updateOtherFunctionField() {

    const selectedFunction =
        fonctionSelect.value;


    if (
        selectedFunction === "Autres"
    ) {

        autreFonctionGroup.classList.remove(
            "hidden"
        );

        autreFonction.required = true;

    } else {

        autreFonctionGroup.classList.add(
            "hidden"
        );

        autreFonction.required = false;

        autreFonction.value = "";

        clearError("autreFonction");
    }
}


// ======================================================
// CHANGEMENT DE FONCTION
// ======================================================

fonctionSelect.addEventListener(
    "change",
    function() {

        clearError("fonction");

        updateRegistrationFee();

        updateOtherFunctionField();
    }
);


// ======================================================
// VALIDATION D'UN CHAMP
// ======================================================

function validateField(fieldName) {

    const field =
        document.getElementById(fieldName);

    const value =
        cleanText(field.value);


    clearError(fieldName);


    // ==============================================
    // CHAMPS TEXTUELS
    // ==============================================

    if (
        fieldName === "nom" ||
        fieldName === "prenoms"
    ) {

        if (!value) {

            const message =
                fieldName === "nom"
                    ? "Veuillez saisir votre nom."
                    : "Veuillez saisir votre/vos prénom(s).";

            setError(
                fieldName,
                message
            );

            return false;
        }


        if (value.length < 2) {

            setError(
                fieldName,
                "Cette information est insuffisante."
            );

            return false;
        }


        return true;
    }


    // ==============================================
    // EMAIL
    // ==============================================

    if (fieldName === "email") {

        if (!value) {

            setError(
                "email",
                "Veuillez saisir votre adresse e-mail."
            );

            return false;
        }


        if (!isValidEmail(value)) {

            setError(
                "email",
                "Veuillez saisir une adresse e-mail valide."
            );

            return false;
        }


        return true;
    }


    // ==============================================
    // TÉLÉPHONE
    // ==============================================

    if (fieldName === "telephone") {

        if (!value) {

            setError(
                "telephone",
                "Veuillez saisir votre numéro de téléphone."
            );

            return false;
        }


        if (!isValidPhone(value)) {

            setError(
                "telephone",
                "Veuillez saisir un numéro de téléphone valide."
            );

            return false;
        }


        return true;
    }


    // ==============================================
    // FONCTION
    // ==============================================

    if (fieldName === "fonction") {

        if (!fonctionSelect.value) {

            setError(
                "fonction",
                "Veuillez sélectionner votre fonction."
            );

            return false;
        }


        return true;
    }


    // ==============================================
    // AUTRE FONCTION
    // ==============================================

    if (
        fieldName === "autreFonction"
    ) {

        if (
            fonctionSelect.value !== "Autres"
        ) {

            clearError("autreFonction");

            return true;
        }


        if (!value) {

            setError(
                "autreFonction",
                "Veuillez préciser votre fonction."
            );

            return false;
        }


        if (value.length < 2) {

            setError(
                "autreFonction",
                "Veuillez préciser correctement votre fonction."
            );

            return false;
        }


        return true;
    }


    return true;
}


// ======================================================
// VALIDATION DE TOUT LE FORMULAIRE
// ======================================================

function validateForm() {

    let isValid = true;


    // Champs principaux

    fields.forEach(
        function(fieldName) {

            const valid =
                validateField(fieldName);

            if (!valid) {
                isValid = false;
            }
        }
    );


    // Autre fonction

    if (
        fonctionSelect.value === "Autres"
    ) {

        const otherValid =
            validateField("autreFonction");

        if (!otherValid) {
            isValid = false;
        }
    }


    return isValid;
}


// ======================================================
// VALIDATION EN DIRECT
// ======================================================

[
    "nom",
    "prenoms",
    "email",
    "telephone",
    "autreFonction"
].forEach(
    function(fieldName) {

        const field =
            document.getElementById(fieldName);


        field.addEventListener(
            "blur",
            function() {

                validateField(fieldName);
            }
        );


        field.addEventListener(
            "input",
            function() {

                if (
                    field.classList.contains(
                        "invalid"
                    )
                ) {

                    validateField(fieldName);
                }
            }
        );
    }
);


// ======================================================
// SOUMISSION DU FORMULAIRE
// ======================================================

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        // Réinitialiser le message

        formMessage.textContent = "";

        formMessage.className =
            "form-message";


        // ==============================================
        // VALIDATION
        // ==============================================

        const isValid =
            validateForm();


        if (!isValid) {

            formMessage.textContent =
                "Veuillez corriger les champs indiqués.";

            formMessage.classList.add(
                "error"
            );

            return;
        }

        // ===============================
        // VÉRIFICATION DU CLIENT SUPABASE
        // ===============================

        if (!supabaseClient) {

            formMessage.textContent =
                "Erreur : Impossible de se connecter à la base de données. Veuillez réessayer plus tard.";

            formMessage.classList.add(
                "error"
            );

            return;
        }

        // ==============================================
        // RÉCUPÉRATION DES DONNÉES
        // ==============================================

        const nom =
            cleanText(
                document.getElementById("nom").value
            );

        const prenoms =
            cleanText(
                document.getElementById("prenoms").value
            );

        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();

        const telephone =
            document
                .getElementById("telephone")
                .value
                .trim();

        const fonction =
            fonctionSelect.value;


        // ==============================================
        // AUTRE FONCTION
        // ==============================================

        const fonctionPrecision =
            fonction === "Autres"
                ? cleanText(
                    autreFonction.value
                )
                : null;


        // ==============================================
        // DONNÉES À ENVOYER À SUPABASE
        // ==============================================

        const registrationData = {

            nom: nom,

            prenoms: prenoms,

            email: email,

            telephone: telephone,

            fonction: fonction,

            fonction_precision:
                fonctionPrecision
        };


        // ==============================================
        // ATTENTE D'ENVOI
        // ==============================================

        submitButton.disabled = true;

        submitButton.textContent =
            "Inscription en cours...";


        try {

            // ==========================================
            // ENVOI SUPABASE
            // ==========================================

            const { error } =
                await supabaseClient
                    .from("inscriptions")
                    .insert(
                        [registrationData]
                    );


            // ==========================================
            // ERREUR SUPABASE
            // ==========================================

            if (error) {

                throw error;
            }


            // ==========================================
            // SUCCÈS
            // ==========================================

            formMessage.textContent =
                "Votre inscription a bien été enregistrée.";

            formMessage.classList.add(
                "success"
            );


            // Réinitialiser le formulaire

            form.reset();


            // Réinitialiser les éléments dynamiques

            autreFonctionGroup.classList.add(
                "hidden"
            );

            autreFonction.required = false;

            fraisInscription.classList.add(
                "hidden"
            );

            montantInscription.textContent = "";


            // Nettoyer les erreurs

            [
                "nom",
                "prenoms",
                "email",
                "telephone",
                "fonction",
                "autreFonction"
            ].forEach(
                function(fieldName) {

                    clearError(fieldName);
                }
            );


        } catch (error) {

            // Garder les détails techniques dans la console uniquement.

            console.error(
                "Erreur Supabase :",
                error
            );


            formMessage.textContent =
                "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";

            formMessage.classList.add(
                "error"
            );


        } finally {

            // Réactiver le bouton

            submitButton.disabled = false;

            submitButton.textContent =
                "S'inscrire";
        }

    }
);