#include "runtime/function/framework/component/property/property_component.h"

#include "runtime/core/base/macro.h"

#include "runtime/function/character/character.h"
#include "runtime/function/controller/character_controller.h"
#include "runtime/function/framework/component/animation/animation_component.h"
#include "runtime/function/framework/component/camera/camera_component.h"
#include "runtime/function/framework/component/transform/transform_component.h"
#include "runtime/function/framework/level/level.h"
#include "runtime/function/framework/object/object.h"
#include "runtime/function/framework/world/world_manager.h"
#include "runtime/function/global/global_context.h"


namespace Piccolo
{
    void PropertyComponent::tick(float delta_time)
    {
        this->tickProperty(delta_time);
    }

    void PropertyComponent::tickProperty(float delta_time)
    {
        if (!m_parent_object.lock())
        {
            return;
        }

        float hp = this->m_property_res.m_hp;
        float max_hp = this->m_property_res.m_max_hp;
        this->m_property_res.m_hp = hp > max_hp ? max_hp : hp;
    }
} // namespace Piccolo
