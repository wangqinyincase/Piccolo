#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _COLORS      = float(lut_tex_size.y);

    highp vec4 color       = subpassLoad(in_color).rgba;
    highp vec2 lutsize = vec2(lut_tex_size.x, lut_tex_size.y);

    highp float blockSize = _COLORS;

    
    highp vec2 uv;
    highp float blockIndex = floor(color.b * blockSize);
    highp float lutCoordX = blockIndex * blockSize + color.r * blockSize;
    highp float lutCoordU = lutCoordX / lutsize.x;

    uv.x = lutCoordU;
    uv.y = color.g;


    //out_color = texture(color_grading_lut_texture_sampler, uv);
    out_color = color;
}
