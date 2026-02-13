import { Material, MaterialCard } from "@/components/class/MaterialCard";

interface MaterialsTabProps {
    materials: Material[];
}

export const MaterialsTab = ({ materials }: MaterialsTabProps) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
            ))}
        </div>
    );
};
