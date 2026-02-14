import { useState } from "react";
import { Material, MaterialCard } from "@/components/class/MaterialCard";
import { SecureMaterialViewer } from "@/components/class/SecureMaterialViewer";

interface MaterialsTabProps {
    materials: Material[];
}

export const MaterialsTab = ({ materials, userEmail = "student@edulock.com", userName = "Guest" }: MaterialsTabProps & { userEmail?: string, userName?: string }) => {
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {materials.map((material) => (
                    <div key={material.id} onClick={() => setSelectedMaterial(material)} className="cursor-pointer">
                        <MaterialCard material={material} />
                    </div>
                ))}
            </div>

            {selectedMaterial && (
                <SecureMaterialViewer
                    isOpen={!!selectedMaterial}
                    onClose={() => setSelectedMaterial(null)}
                    materialId={String(selectedMaterial.id)}
                    materialType={selectedMaterial.type}
                    materialTitle={selectedMaterial.title}
                    userEmail={userEmail}
                    userName={userName}
                />
            )}
        </>
    );
};
