#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _PIXEL  = float(lut_tex_size.y);
    highp float _WIDTH = float(lut_tex_size.x);
    highp float _BLOCKS = _WIDTH / _PIXEL;

    highp vec4 color = subpassLoad(in_color).rgba;

    // B 通道
    highp float blue_color = color.b;

    // 根据 B 通道 计算具体块的索引
    highp float lut_block_floor = floor(blue_color * _BLOCKS);
    highp float lut_block_ceil = ceil(blue_color * _BLOCKS);

    // R 和 G 通道
    highp float red_color = color.r;
    highp float green_color = color.g;

    // 根据 R 和 G 通道计算 uv 坐标
    highp vec2 uv_floor;
    uv_floor.x = (lut_block_floor + red_color) * _PIXEL / _WIDTH;
    uv_floor.y = green_color;

    highp vec2 uv_ceil;
    uv_ceil.x = (lut_block_ceil + red_color) * _PIXEL / _WIDTH;
    uv_ceil.y = green_color;

    // 纹理采样，混合颜色
    highp vec4 lut_floor_color = texture(color_grading_lut_texture_sampler, uv_floor);
    highp vec4 lut_ceil_color = texture(color_grading_lut_texture_sampler, uv_ceil);
    highp vec4 lut_color = mix(lut_floor_color, lut_ceil_color, red_color);

    // 颜色输出
    out_color = lut_color;
}
