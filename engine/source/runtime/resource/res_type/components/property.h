#pragma once

#include "runtime/core/math/vector3.h"
#include "runtime/core/meta/reflection/reflection.h"

namespace Piccolo
{
    REFLECTION_TYPE(PropertyComponentRes)
    CLASS(PropertyComponentRes, Fields)
    {
        REFLECTION_BODY(PropertyComponentRes);

    public:
        PropertyComponentRes() = default;
        ~PropertyComponentRes();

        float m_hp { 0.f};
        float m_max_hp {0.f};
        std::string m_tag {""};
    };
} // namespace Piccolo