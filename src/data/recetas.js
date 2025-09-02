const recetas = [
    {
        "nombre": "Pizza Margarita",
        "foto": "receta_1.jpg",
        "instrucciones": "Preparar la masa y extenderla en una bandeja. Agregar salsa de tomate, mozzarella, albahaca y hornear.",
        "perfil_id": 2,
        "ingredientes": [
            {"ingrediente_id": 1, "cantidad": 250, "unidad_medida": "g"},
            {"ingrediente_id": 4, "cantidad": 200, "unidad_medida": "g"},
            {"ingrediente_id": 6, "cantidad": 10, "unidad_medida": "g"},
            {"ingrediente_id": 10, "cantidad": 1, "unidad_medida": "pizca"},
            {"ingrediente_id": 11, "cantidad": 30, "unidad_medida": "g"}
        ]
    },
    {
        "nombre": "Ensalada César",
        "foto": "receta_2.jpg",
        "instrucciones": "Mezclar lechuga, crutones, pollo a la parrilla, queso parmesano y aderezo César.",
        "perfil_id": 3,
        "ingredientes": [
            {"ingrediente_id": 7, "cantidad": 100, "unidad_medida": "g"},
            {"ingrediente_id": 8, "cantidad": 50, "unidad_medida": "g"},
            {"ingrediente_id": 3, "cantidad": 200, "unidad_medida": "g"},
            {"ingrediente_id": 9, "cantidad": 50, "unidad_medida": "g"},
            {"ingrediente_id": 10, "cantidad": 1, "unidad_medida": "pizca"}
        ]
    },
    {
        "nombre": "Lasagna",
        "foto": "receta_3.jpg",
        "instrucciones": "Cocinar pasta, hacer salsa de carne, armar capas de pasta, carne, queso ricotta, mozzarella y hornear.",
        "perfil_id": 2,
        "ingredientes": [
            {"ingrediente_id": 1, "cantidad": 300, "unidad_medida": "g"},
            {"ingrediente_id": 2, "cantidad": 200, "unidad_medida": "g"},
            {"ingrediente_id": 3, "cantidad": 3, "unidad_medida": "unidades"},
            {"ingrediente_id": 9, "cantidad": 150, "unidad_medida": "g"},
            {"ingrediente_id": 12, "cantidad": 100, "unidad_medida": "g"}
        ]
    },
    {
        "nombre": "Sushi de Salmón",
        "instrucciones": "Hacer arroz de sushi, colocarlo sobre nori, agregar salmón y aguacate, enrollar y cortar.",
        "perfil_id": 4,
        "ingredientes": [
            {"ingrediente_id": 13, "cantidad": 200, "unidad_medida": "g"},
            {"ingrediente_id": 14, "cantidad": 150, "unidad_medida": "g"},
            {"ingrediente_id": 5, "cantidad": 100, "unidad_medida": "g"},
            {"ingrediente_id": 6, "cantidad": 5, "unidad_medida": "g"},
            {"ingrediente_id": 10, "cantidad": 1, "unidad_medida": "pizca"}
        ]
    },
    {
        "nombre": "Tacos de Camarones",
        "foto": "receta_5.jpg",
        "instrucciones": "Preparar camarones a la parrilla, servir en tortillas de maíz con repollo y salsa de aguacate.",
        "perfil_id": 4,
        "ingredientes": [
            {"ingrediente_id": 3, "cantidad": 300, "unidad_medida": "g"},
            {"ingrediente_id": 4, "cantidad": 2, "unidad_medida": "unidades"},
            {"ingrediente_id": 10, "cantidad": 8, "unidad_medida": "unidades"}
        ]
    },
    {
        "nombre": "Risotto de Champiñones",
        "foto": "receta_6.jpg",
        "instrucciones": "Saltear champiñones y cebolla, agregar arroz Arborio y caldo de pollo, cocinar y agregar queso parmesano.",
        "perfil_id": 3,
        "ingredientes": [
            {"ingrediente_id": 1, "cantidad": 200, "unidad_medida": "g"},
            {"ingrediente_id": 2, "cantidad": 50, "unidad_medida": "g"},
            {"ingrediente_id": 6, "cantidad": 5, "unidad_medida": "g"},
            {"ingrediente_id": 10, "cantidad": 200, "unidad_medida": "g"}
        ]
    },
    {
        "nombre": "Sopa de Lentejas",
        "instrucciones": "Cocinar lentejas con zanahorias, cebolla y especias hasta que estén tiernas.",
        "perfil_id": 4,
        "ingredientes": [
            {"ingrediente_id": 2, "cantidad": 200, "unidad_medida": "g"},
            {"ingrediente_id": 8, "cantidad": 150, "unidad_medida": "g"},
            {"ingrediente_id": 3, "cantidad": 2, "unidad_medida": "unidades"},
            {"ingrediente_id": 9, "cantidad": 150, "unidad_medida": "g"},
            {"ingrediente_id": 10, "cantidad": 1, "unidad_medida": "pizca"}
        ]
    },
    {
        "nombre": "Tarta de Manzana",
        "foto": "receta_8.jpg",
        "instrucciones": "Preparar masa, cortar manzanas, colocarlas sobre la masa, espolvorear canela y hornear.",
        "perfil_id": 2,
        "ingredientes": [
            {"ingrediente_id": 1, "cantidad": 200, "unidad_medida": "g"},
            {"ingrediente_id": 2, "cantidad": 100, "unidad_medida": "g"},
            {"ingrediente_id": 4, "cantidad": 4, "unidad_medida": "unidades"},
            {"ingrediente_id": 7, "cantidad": 50, "unidad_medida": "g"},
            {"ingrediente_id": 10, "cantidad": 1, "unidad_medida": "pizca"}
        ]
    }
];

module.exports = recetas;