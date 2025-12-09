import { useParams, useNavigate } from "react-router-dom";
import { useBusQuery } from "./bus.hooks";
import * as S from "./style/busDetail.style";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  BusIconEdit,
  BusBackButton,
} from "./style/busButtons.style";

export function BusDetail() {
  const { id } = useParams();
  const busId = Number(id);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useBusQuery(busId);

  if (isLoading) return <S.Page>Betöltés...</S.Page>;

  if (isError || !data)
    return (
      <S.Page>
        <div style={{ color: "#E5342B" }}>Nem található ilyen busz.</div>
      </S.Page>
    );

  return (
    <S.Page>
      <S.Header>
        <S.Title variant="h3">Busz #{data.id}</S.Title>
        <S.Subtitle>
          Megtekintés – modell, rendszám, státusz, kapacitás
        </S.Subtitle>
      </S.Header>

      <S.Card>
        {/* Cím + Szerkesztés CTA */}
        <S.CardHeader>
          <S.CardTitle>Busz adatai</S.CardTitle>

          <BusIconEdit
            type="button"
            title="Szerkesztés"
            onClick={() => navigate(`/buses/${data.id}/edit`)}
          >
            <EditIcon fontSize="small" />
          </BusIconEdit>
        </S.CardHeader>

        {/* Details */}
        <S.DetailsWrapper>
          <S.DetailRow>
            <S.DetailLabel>Modell</S.DetailLabel>
            <S.DetailValue>{data.model}</S.DetailValue>
          </S.DetailRow>

          <S.DetailRow>
            <S.DetailLabel>Rendszám</S.DetailLabel>
            <S.DetailValue>{data.plate}</S.DetailValue>
          </S.DetailRow>

          <S.DetailRow>
            <S.DetailLabel>Státusz</S.DetailLabel>
            <S.DetailValue>{data.status}</S.DetailValue>
          </S.DetailRow>

          <S.DetailRow>
            <S.DetailLabel>Kapacitás</S.DetailLabel>
            <S.DetailValue>{data.capacity}</S.DetailValue>
          </S.DetailRow>
        </S.DetailsWrapper>

        <div style={{ marginTop: "24px" }}>
          <BusBackButton type="button" onClick={() => navigate("/buses")}>
            <ArrowBackIosNewIcon fontSize="small" />
            <span>Vissza</span>
          </BusBackButton>
        </div>
      </S.Card>
    </S.Page>
  );
}

export default BusDetail;
