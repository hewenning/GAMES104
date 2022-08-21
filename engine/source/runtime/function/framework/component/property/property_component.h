#pragma once

#include "runtime/function/framework/component/component.h"

#include "runtime/resource/res_type/components/property.h"

#include <vector>

namespace Piccolo
{
    REFLECTION_TYPE(PropertyComponent)
    CLASS(PropertyComponent : public Component, WhiteListFields)
    {
        REFLECTION_BODY(PropertyComponent)
    public:
        PropertyComponent() {};

        void tick(float delta_time) override;

    private:
        void tickProperty(float delta_time);
    private:
        META(Enable)
        PropertyComponentRes m_property_res;
    };
} // namespace Piccolo
