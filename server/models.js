
export function Line(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
}

export function Station(id, name) {
    this.id = id;
    this.name = name;
}

export function Event(id, description, effect) {
    this.id = id;
    this.description = description;
    this.effect = effect;
}