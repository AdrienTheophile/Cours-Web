package com.example.examplemod.item;

import net.minecraft.tags.BlockTags;
import net.minecraft.world.item.Tier;
import net.minecraft.world.item.crafting.Ingredient;
import net.minecraftforge.common.ForgeTier;

public class ModToolTiers {

    public static final Tier LIGHT = new ForgeTier(
            1400, // durabilité
            1f,   // vitesse de minage
            14f,  // bonus de dégâts
            22,   // enchantabilité
            BlockTags.MINEABLE_WITH_PICKAXE, // tag de blocs minables
            () -> Ingredient.EMPTY,          // réparation
            BlockTags.INCORRECT_FOR_WOODEN_TOOL // blocs incorrects
    );

}
