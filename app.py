from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

def calculate_slats(height):
    slat_height = 120  # Altura de cada lama
    overlap = 6  # Solapamiento por arriba y abajo
    frame_offset = 60  # Desplazamiento por los marcos (60 mm arriba y abajo)

    # Espacio disponible para las lamas
    effective_height = height - 2 * frame_offset
    
    # Altura efectiva de cada lama considerando el solapamiento
    effective_height_per_slat = slat_height - 2 * overlap
    
    # Número de lamas necesarias, redondeado hacia arriba para asegurar que se cubra todo el espacio
    num_slats = math.ceil(effective_height / effective_height_per_slat)
    
    return num_slats

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    height = float(data['height'])
    width = float(data['width'])
    discount = float(data['discount'])

    num_slats = calculate_slats(height)

    items = [
        {
            "ref": "PF023",
            "description": "ALUMINUM TUBE 40 X 40 X 1.3 HIGH",
            "quantity": 2,
            "unitPrice": height / 1000,
            "totalPrice": 2 * (height / 1000)
        },
        {
            "ref": "PF024",
            "description": "ALUMINUM TUBE 40 X 40 X 1.3 WIDTH",
            "quantity": 2,
            "unitPrice": 1.5 * (width / 1000),
            "totalPrice": 2 * 1.5 * (width / 1000)
        },
        {
            "ref": "CE006",
            "description": "19619 - CELOSIA MODEL SQ02 120 MM (K)",
            "quantity": num_slats,
            "unitPrice": 0.5 * (width / 1000),
            "totalPrice": num_slats * 0.5 * (width / 1000)
        },
        {
            "ref": "PA143",
            "description": "ALLEN SCREW M6 X 20 STAINLESS STEEL CONNECTION 2 PERGOLA",
            "quantity": 2 * num_slats,
            "unitPrice": 0.2,
            "totalPrice": 2 * num_slats * 0.2
        }
    ]

    total_price = sum(item["totalPrice"] for item in items)
    discounted_price = total_price * (1 - discount / 100)

    return jsonify({
        "slats": num_slats,
        "items": items,
        "totalPrice": discounted_price
    })

if __name__ == '__main__':
    app.run(debug=True)
