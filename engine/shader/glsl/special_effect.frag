#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp vec4 color = subpassLoad(in_color).rgba;
    highp int x = int(gl_FragCoord.x);
    highp int y = int(gl_FragCoord.y);

    // 滤网
    out_color = (x % 100 == 0 || y % 100 == 0) ? vec4(1, 1, 1, 1) : color;
}
