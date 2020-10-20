precision mediump float;

varying vec2 vTexCoord;
uniform float uAspectRatio;
uniform float uTime;
uniform float uRandSeed;

const float N = 6.;
const float m = 0.007;

const float period = 3.;

float rand(vec2 co, float seed){
    co.x += seed + uRandSeed;
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float quarterCircle(vec2 guv) {
    guv += 0.5;
    float d = length(guv);
    d -= 0.7;
    return 1. - smoothstep(abs(d), 0., m); 
}

float twoCircles(vec2 uv) {
    float t = 0.;
    t += quarterCircle(uv);
    uv *= -1.;
    t += quarterCircle(uv);
    return t;
}

// float line(vec2 uv, vec2 p1, vec2 p2) {
//     float d = abs(dot(uv - p1, normalize(p2 - p1)));
//     d = 1. - smoothstep(abs(d), 0., m);
//     return d;
// }

float line( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    float d = length( pa - ba*h );
    return 1. - smoothstep(abs(d), 0., m);
}

float remap(float x, float a1, float b1, float a2, float b2) {
    return a2 + (b2 - a2) * (x - a1) / (b1 - a1);
}

float tile(vec2 uv) {
    float t = 0.005;
    //t += twoCircles(uv);
    float time = pow(abs(remap(sin(uTime*6.28 / period - 3.14), -1., 1., 0.001, 1.)), 15.);
    float p = mix(0., -.55, time);
    t += line(uv, vec2(-0.5, -p), vec2(p, 0.5));
    t += line(uv, vec2(-p, -0.5), vec2(0.5, p));
    //t += line(uv, vec2(-0.5), vec2(0.5));
    uv.y *= -1.;
    //t += twoCircles(uv);
    return t;
}

void main() {
    vec2 uv = vTexCoord;
    vec3 col = vec3(0.);
    //
    vec2 guv = fract(N * uv) - 0.5;
    vec2 gid = floor(N * uv);
    int rand = int(floor(rand(gid, 0.123 * floor(uTime / period + 0.25))*4.));
    if (rand == 0) {
        
    }
    else if (rand == 1) {
        guv = vec2(guv.y, -guv.x);
    }
    else if (rand == 2) {
        guv *= -1.;
    }
    else if (rand == 3) {
        guv = vec2(-guv.y, guv.x);
    }
    col += tile(guv);
    //    
    gl_FragColor = vec4(col, 1.);
}
