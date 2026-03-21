export default function AnimatedBackdrop() {
  return (
    <div className="pageBackdrop" aria-hidden="true">
      <div className="pageBackdropGrid" />
      <div className="pageBackdropGlow pageBackdropGlowOne" />
      <div className="pageBackdropGlow pageBackdropGlowTwo" />
      <div className="pageBackdropNoise" />
    </div>
  );
}
