import Image from "next/image";
import { Container } from "@/src/components/layout/Container";
import { Button } from "@/src/components/ui/Button";
import { Reveal } from "@/src/components/ui/Reveal";
import type { CmsHeroBlock, CmsButton } from "@/lib/cms/types";
import { getCmsMediaUrl, isLikelyVideoUrl, normalizeCmsMediaUrl } from "@/lib/cms/mediaUrl";

type Props = {
  block?: CmsHeroBlock;
};

function isVideoMedia(
  mediaUrl?: string,
  fileName?: string | null,
  fileType?: string | null,
) {
  const type = (fileType || "").toLowerCase();
  if (type.startsWith("video/")) return true;

  const name = (fileName || mediaUrl || "").toLowerCase();

  return (
    name.endsWith(".mp4") ||
    name.endsWith(".webm") ||
    name.endsWith(".mov") ||
    name.endsWith(".m4v") ||
    name.endsWith(".ogg") ||
    name.endsWith(".ogv")
  );
}

export function Hero({ block }: Props) {
  const title = block?.title || "SOVE. PROPTECH\nPLATFORM & DESIGN.";
  const text =
    block?.text ||
    "Инвестиционный ремонт по новым правилам. Технологии, прозрачность, контроль.";

  const heroMedia = block?.media?.[0] ?? null;
  const mediaSrc = getCmsMediaUrl(heroMedia) || "/images/hero.jpg";

  const isVideo =
    isVideoMedia(
      mediaSrc,
      heroMedia?.file_name ?? null,
      heroMedia?.file_type ?? null,
    ) ||
    // In prod, CMS can return preview images in url/large_url even for videos.
    // If any raw URL looks like a video, treat the hero as video.
    [heroMedia?.url, heroMedia?.file_url, heroMedia?.large_url, heroMedia?.medium_url]
      .map((u) => normalizeCmsMediaUrl(u))
      .some((u) => isLikelyVideoUrl(u));

  const videoPoster =
    normalizeCmsMediaUrl(heroMedia?.thumbnail_url) ||
    normalizeCmsMediaUrl(heroMedia?.medium_url) ||
    normalizeCmsMediaUrl(heroMedia?.large_url) ||
    undefined;

  const buttons: CmsButton[] = Array.isArray(block?.button)
    ? block.button
    : block?.button
      ? [block.button]
      : [];

  const primaryButtonLabel =
    block?.primary_button_label ||
    buttons.find((btn) => btn.position === 0)?.name ||
    "ПРЕДЗАПИСЬ";

  const secondaryButtonLabel =
    block?.secondary_button_label ||
    buttons.find((btn) => btn.position === 1)?.name ||
    "ГОТОВЫЕ ИНТЕРЬЕРНЫЕ РЕШЕНИЯ";

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {isVideo ? (
          <video
            className="h-full w-full object-cover"
            src={mediaSrc}
            poster={videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={mediaSrc}
            alt={title}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-black/10" />
      </div>

      <Container className="relative z-10 flex min-h-screen items-end pb-12 sm:pb-12 lg:pb-22">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="w-full max-w-[1040px] flex-1">
            <Reveal delay={0}>
              <h1 className="whitespace-pre-line uppercase font-light leading-[0.98] tracking-[-0.02em] text-white text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[55px]">
                {title}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 max-w-[860px] text-white/85 font-normal leading-[1.3] text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[23px] normal-case">
                {text}
              </p>
            </Reveal>
          </div>

          <div className="w-full lg:w-[561px] lg:shrink-0">
            <div className="flex w-full flex-col gap-3 sm:gap-4 max-w-[561px]">
              <Reveal delay={0.22}>
                <Button
                  href="/packages"
                  variant="primary"
                  size="lg"
                  fullWidth
                  maxWidth={false}
                  className="w-full max-w-[561px]"
                >
                  {primaryButtonLabel}
                </Button>
              </Reveal>

              <Reveal delay={0.32}>
                <Button
                  href="/concepts"
                  variant="outlineDark"
                  size="lg"
                  fullWidth
                  maxWidth={false}
                  className="w-full max-w-[561px]"
                >
                  {secondaryButtonLabel}
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
