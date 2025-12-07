import { useParams, useNavigate, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useBusQuery } from "./bus.hooks";
import * as S from "./style/busDetail.style";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";


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
          <Typography
            fontWeight={700}
            sx={{ fontSize: "1.2rem", color: "var(--primary-color)" }}
          >
            Busz adatai
          </Typography>

            <Link
            to={`/buses/${data.id}/edit`}
            className="hcl-edit-cta"
            >
            <EditIcon fontSize="small" />
            <span>Szerkesztés</span>
            </Link>


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
  <button onClick={() => navigate("/buses")} className="hcl-back-btn">
    <ArrowBackIosNewIcon fontSize="small" />
    <span>Vissza</span>
  </button>
</div>

      </S.Card>
    </S.Page>
  );
}

export default BusDetail;
