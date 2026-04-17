# godot_example.gd
# Godot GDScript implementation of Kiyoshi principles

extends Node2D

# Proximity Threshold Connection
class_name ProximityConnections

var particles = []
var connections = []
var threshold := 100.0
var particle_count := 50

class Particle:
    var pos: Vector2
    var vel: Vector2
    
    func _init(x: float, y: float):
        pos = Vector2(x, y)
        vel = Vector2(randf() - 0.5, randf() - 0.5) * 2
    
    func update(delta: float, bounds: Vector2):
        pos += vel * delta * 60
        # Bounce
        if pos.x < 0 or pos.x > bounds.x: vel.x *= -1
        if pos.y < 0 or pos.y > bounds.y: vel.y *= -1

func _ready():
    randomize()
    var bounds = get_viewport_rect().size
    for i in particle_count:
        particles.append(Particle.new(randf() * bounds.x, randf() * bounds.y))

func _process(delta):
    var bounds = get_viewport_rect().size
    
    # Update particles
    for p in particles:
        p.update(delta, bounds)
    
    # Find connections
    connections.clear()
    for i in range(particles.size()):
        for j in range(i + 1, particles.size()):
            var dist = particles[i].pos.distance_to(particles[j].pos)
            if dist < threshold:
                connections.append({
                    "from": particles[i].pos,
                    "to": particles[j].pos,
                    "strength": 1.0 - dist / threshold
                })
    
    queue_redraw()

func _draw():
    # Draw connections
    for conn in connections:
        var alpha = conn.strength * 0.5
        draw_line(conn.from, conn.to, Color(0.5, 0.8, 1.0, alpha), 1.0)
    
    # Draw particles
    for p in particles:
        draw_circle(p.pos, 3.0, Color(0.3, 0.6, 1.0))

# Deterministic Frame Random
func deterministic_random(frame: int, seed: int = 39) -> float:
    var rng = RandomNumberGenerator.new()
    rng.seed = seed + frame
    return rng.randf()

# Stepped Lifetime Alpha
func stepped_alpha(life_ratio: float, split_point: float = 0.5) -> float:
    if life_ratio < split_point:
        return 1.0
    else:
        var t = (life_ratio - split_point) / (1.0 - split_point)
        return 1.0 - ease_out_cubic(t)

func ease_out_cubic(t: float) -> float:
    return 1.0 - pow(1.0 - t, 3.0)

# Frame Synced Spiral Spawn
func spiral_spawn(frame: int, spin_rate: float = 14.4, expand_rate: float = 3.0) -> Vector2:
    var angle = deg_to_rad(frame * spin_rate)
    var radius = fmod(frame * expand_rate, 360.0)
    return Vector2(cos(angle) * radius, sin(angle) * radius)

# Two Frame Animation
func two_frame_state(time: float, fps: float = 4.0) -> bool:
    return int(time * fps) % 2 == 0
