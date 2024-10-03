import type { ApiOffice, ApiOfficeFloor } from "@galadrim-tools/shared";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBackendJson } from "../../api/fetch";

export const useOfficeFloorSelect = (selectedOffice: ApiOffice | null) => {
    const navigate = useNavigate();
    const { officeId, officeFloorId: officeFloorIdRaw } = useParams();
    const officeFloorId = officeFloorIdRaw ? Number(officeFloorIdRaw) : null;
    const query = useQuery({
        queryKey: ["office-floors"],
        queryFn: async () => {
            const res = await fetchBackendJson<{ data: ApiOfficeFloor[] }, unknown>(
                "/adomin/api/models/crud/OfficeFloor?pageIndex=1&pageSize=100",
                "GET",
            );

            if (!res.ok) {
                throw new Error("Impossible de récupérer les étages des bureaux");
            }

            return res.json;
        },
    });

    const options = useMemo(() => {
        if (!query.data) return [];

        const options = query.data.data
            .filter((o) => o.officeId === selectedOffice?.id)
            .map((o) => ({
                label: `${selectedOffice?.name ?? ""} étage ${o.floor}`,
                value: o.id,
            }));

        return options;
    }, [query.data, selectedOffice]);

    const selected = useMemo(() => {
        if (!query.data) return null;

        return query.data.data.find((o) => o.id === officeFloorId) ?? null;
    }, [query.data, officeFloorId]);

    const setSelected = (newState: ApiOfficeFloor | null) => {
        if (!newState) {
            navigate(`/office-rooms/${officeId}`);
        } else {
            navigate(`/office-rooms/${officeId}/${newState.id}`);
        }
    };

    const setSelectedFromId = (id: number) => {
        const found = query.data?.data.find((o) => o.id === id);
        if (!found) return;
        setSelected(found);
    };

    return {
        officeFloorsOptions: options,
        selectedOfficeFloor: selected,
        selectedOfficeFloorId: selected?.id ?? null,
        setSelectedOfficeFloorFromId: setSelectedFromId,
    };
};
