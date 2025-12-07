// src/page/bus/BusList.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useBusesQuery,
  useDeleteBusMutation,
} from "./bus.hooks";
import type { Bus } from "./bus.types";
import * as S from "./style/bus.style";
import { busPageData } from "./data/bus.data";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import "./style/css/bus.classes.css";
import BusCreateModal from "./BusCreateModal";
import { useToast } from "../../component/ui/toast/ToastProvider";

export function BusList() {
  const { data, isLoading, isError } = useBusesQuery();
  const deleteBusMutation = useDeleteBusMutation();
  const { showToast } = useToast();


  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleOpenCreate = () => {
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
  };

  const handleDelete = (bus: Bus) => {
    if (!window.confirm(`Biztosan törölni szeretnéd: ${bus.model}?`)) return;

    deleteBusMutation.mutate(bus.id, {
      onSuccess: () => {
        showToast({
          variant: "success",
          message: `„${bus.model}” busz sikeresen törölve.`,
        });
      },
      onError: () => {
        showToast({
          variant: "error",
          message: "Nem sikerült törölni a buszt. Próbáld újra.",
        });
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
          <button
            className="hcl-btn hcl-btn-cta"
            onClick={handleOpenCreate}
            type="button"
          >
            <AddRoundedIcon fontSize="small" />
            <DirectionsBusFilledIcon fontSize="small" />
            <span>Új busz</span>
          </button>
        </S.CardHeaderRow>

        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Modell</th>
                <th className="bus-cell-right">Rendszám</th>
                <th className="bus-cell-center">Státusz</th>
                <th className="bus-cell-right">Kapacitás</th>
                <th className="bus-cell-center">Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((bus) => (
                <tr key={bus.id}>
                  <td data-label="ID">{bus.id}</td>
                  <td data-label="Modell">{bus.model}</td>
                  <S.CellRight data-label="Rendszám">
                    {bus.plate}
                  </S.CellRight>
                  <td data-label="Státusz" className="bus-status-cell">
                    <span
                      className={`bus-status-pill bus-status-${bus.status}`}
                    >
                      {bus.status}
                    </span>
                  </td>
                  <S.CellRight data-label="Kapacitás">
                    {bus.capacity}
                  </S.CellRight>
                  <S.ActionsCell data-label="Műveletek">
                    <S.Actions>
                     <Link
                          to={`/buses/${bus.id}`}
                          className="hcl-icon-btn bus-action-view"
                        >
                          <VisibilityIcon fontSize="small" />
                        </Link>

                        <Link
                          to={`/buses/${bus.id}/edit`}
                          className="hcl-icon-btn bus-action-edit"
                        >
                          <EditIcon fontSize="small" />
                        </Link>


                      {/* TÖRLÉS */}
                      <button
                        type="button"
                        className="hcl-icon-btn hcl-icon-btn--danger"
                        aria-label={`Busz #${bus.id} törlése`}
                        title="Törlés"
                        onClick={() => handleDelete(bus)}
                        disabled={deleteBusMutation.isPending}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </button>
                    </S.Actions>
                  </S.ActionsCell>
                </tr>
              ))}

              {data && data.length === 0 && (
                <tr>
                  <td colSpan={6}>Jelenleg nincs felvett busz.</td>
                </tr>
              )}
            </tbody>
          </S.Table>
        </S.TableWrapper>
      </S.Card>

      {/* ÚJ BUSZ MODAL */}
      <BusCreateModal open={isCreateOpen} onClose={handleCloseCreate} />
    </S.Page>
  );
}

export default BusList;
