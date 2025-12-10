// src/page/bus/BusList.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useBusesQuery,
  useDeleteBusMutation,
} from "./bus.hooks";
import type { Bus } from "./bus.types";
import * as S from "./style/bus.style";
import {
  BusListCtaButton,
  BusIconView,
  BusIconEdit,
  BusIconDelete,
} from "./style/busButtons.style";

import { busPageData } from "./data/bus.data";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import "./style/css/bus.classes.css";
import BusCreateModal from "./BusCreateModal";
import { useToast } from "../../component/ui/toast/ToastProvider";
import ConfirmDialog from "../../component/ui/modal/ConfirmDialog";

export function BusList() {
  const { data, isLoading, isError } = useBusesQuery();
  const deleteBusMutation = useDeleteBusMutation();
  const { showToast } = useToast();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [busToDelete, setBusToDelete] = useState<Bus | null>(null);

  const handleOpenCreate = () => {
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
  };

  const handleDeleteRequest = (bus: Bus) => {
    setBusToDelete(bus);
  };

  const handleConfirmDelete = () => {
    if (!busToDelete) return;

    deleteBusMutation.mutate(busToDelete.id, {
      onSuccess: () => {
        showToast({
          variant: "success",
          message: `„${busToDelete.model}” busz sikeresen törölve.`,
        });
        setBusToDelete(null);
      },
      onError: () => {
        showToast({
          variant: "error",
          message: "Nem sikerült törölni a buszt. Próbáld újra.",
        });
        setBusToDelete(null);
      },
    });
  };

  if (isLoading) return <S.Page>Betöltés...</S.Page>;

  if (isError)
    return (
      <S.Page>
        <div style={{ color: "#E5342B" }}>
          Hiba történt a buszok lekérésekor.
        </div>
      </S.Page>
    );

  return (
    <S.Page>
      {/* PAGE HEADER */}
      <S.Header>
        <S.Title variant="h3">{busPageData.title}</S.Title>
        <S.Subtitle>{busPageData.subtitle}</S.Subtitle>
      </S.Header>

      {/* FŐ KÁRTYA – táblázat + Új busz CTA */}
      <S.Card>
        <S.CardHeaderRow>
        <S.CardTitle>Buszok</S.CardTitle>

        <BusListCtaButton
          type="button"
          onClick={handleOpenCreate}
        >
          <AddRoundedIcon fontSize="small" />
          <DirectionsBusFilledIcon fontSize="small" />
          <span>Új busz</span>
        </BusListCtaButton>
      </S.CardHeaderRow>
        <S.TableWrapper>
          <S.Table>
           <thead>
              <tr>
                <th>ID</th>
                <th>Modell</th>
                <th className="bus-cell-center">Rendszám</th>
                <th className="bus-cell-right">Kapacitás</th>
                <th className="bus-cell-center">Státusz</th>
                <th className="bus-cell-center">Műveletek</th>
              </tr>
            </thead>

          <tbody>
                {data?.map((bus) => (
                  <tr key={bus.id}>
                    <td data-label="ID">{bus.id}</td>
                <S.ModelCell data-label="Modell" title={bus.model}>
                  <span className="bus-cell-value">{bus.model}</span>
                </S.ModelCell>


                    {/* RENDSZÁM – KÖZÉPRE */}
                    <td data-label="Rendszám" className="bus-cell-center">
                      {bus.plate}
                    </td>

                    {/* KAPACITÁS – JOBBRA */}
                    <S.CellRight data-label="Kapacitás">
                      {bus.capacity}
                    </S.CellRight>

                    {/* STÁTUSZ – KÖZÉPRE */}
                    <td data-label="Státusz" className="bus-cell-center">
                      <span className={`bus-status-pill bus-status-${bus.status}`}>
                        {bus.status}
                      </span>
                    </td>

                    {/* MŰVELETEK */}
                    <S.ActionsCell data-label="Műveletek">
                      <S.Actions>
                        <Link to={`/buses/${bus.id}`} title="Megtekintés">
                          <BusIconView type="button">
                            <VisibilityIcon fontSize="small" />
                          </BusIconView>
                        </Link>

                        <Link to={`/buses/${bus.id}/edit`} title="Szerkesztés">
                          <BusIconEdit type="button">
                            <EditIcon fontSize="small" />
                          </BusIconEdit>
                        </Link>

                        <BusIconDelete
                          type="button"
                          aria-label={`Busz #${bus.id} törlése`}
                          title="Törlés"
                          onClick={() => handleDeleteRequest(bus)}
                          disabled={deleteBusMutation.isPending}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </BusIconDelete>
                      </S.Actions>
                    </S.ActionsCell>
                  </tr>
                ))}
             </tbody>

          </S.Table>
        </S.TableWrapper>
      </S.Card>

      {/* ÚJ BUSZ MODAL */}
      <BusCreateModal open={isCreateOpen} onClose={handleCloseCreate} />

      {/* TÖRLÉS MEGERŐSÍTŐ DIALOG */}
      <ConfirmDialog
        open={!!busToDelete}
        title="Törlés megerősítése"
        message={
          busToDelete
            ? `Biztosan törölni szeretnéd: ${busToDelete.model}?`
            : "Biztosan törlöd ezt a buszt?"
        }
        confirmLabel="Igen, törlöm"
        cancelLabel="Mégse"
        onConfirm={handleConfirmDelete}
        onCancel={() => setBusToDelete(null)}
      />
    </S.Page>
  );
}

export default BusList;
