package com.example.examplemod.item;

import com.example.examplemod.TestMod;
import net.minecraft.world.item.ArmorItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.SwordItem;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModItems {

    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(ForgeRegistries.ITEMS, TestMod.MOD_ID);

    // ITEMS

    public static final RegistryObject<Item> COTON = ITEMS.register("coton",
            () -> new Item(new Item.Properties()));

    // ARMES

    public static final RegistryObject<Item> LIGHTSABER_BLUE =
            ITEMS.register("lightsaber_blue",
                    () -> new SwordItem(ModToolTiers.LIGHT,new Item.Properties()
                            .attributes( SwordItem.createAttributes( ModToolTiers.LIGHT,5,-2f))));

    public static final RegistryObject<Item> LIGHTSABER_RED =
            ITEMS.register("lightsaber_red",
                    () -> new SwordItem(ModToolTiers.LIGHT,new Item.Properties()
                            .attributes( SwordItem.createAttributes( ModToolTiers.LIGHT,17,-2f))));

    // ARMORS

    public static final RegistryObject<Item> JEDI_HELMET = ITEMS.register("jedi_helmet",
            () -> new ArmorItem(ModArmorMaterials.JEDI_COAT, ArmorItem.Type.HELMET,
                    new Item.Properties().durability(ArmorItem.Type.HELMET.getDurability(18))));

    public static final RegistryObject<Item> JEDI_CHESTPLATE = ITEMS.register("jedi_chestplate",
            () -> new ArmorItem(ModArmorMaterials.JEDI_COAT, ArmorItem.Type.CHESTPLATE,
                    new Item.Properties().durability(ArmorItem.Type.CHESTPLATE.getDurability(18))));

    public static final RegistryObject<Item> JEDI_LEGGINGS = ITEMS.register("jedi_leggings",
            () -> new ArmorItem(ModArmorMaterials.JEDI_COAT, ArmorItem.Type.LEGGINGS,
                    new Item.Properties().durability(ArmorItem.Type.LEGGINGS.getDurability(18))));

    public static final RegistryObject<Item> JEDI_BOOTS = ITEMS.register("jedi_boots",
            () -> new ArmorItem(ModArmorMaterials.JEDI_COAT, ArmorItem.Type.BOOTS,
                    new Item.Properties().durability(ArmorItem.Type.BOOTS.getDurability(18))));

    public static void register(IEventBus eventBus) {
        ITEMS.register(eventBus);
    }
}
