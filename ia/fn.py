def extract_segments(audio):
    # Définir la durée de chaque segment en secondes
    segment_duration = 1

    # Convertir la durée du segment en nombre d'échantillons
    segment_length = int(segment_duration * sr)

    # Découper l'audio en segments de 1 seconde
    segments = [y[i : i + segment_length] for i in range(0, len(y), segment_length)]
    return segments
