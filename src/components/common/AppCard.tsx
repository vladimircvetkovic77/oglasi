import React from "react";
import { Card } from "antd";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "163px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  margin: "0px",
  borderRadius: "8px 8px 0px 0px",
};

interface AppCardProps {
  imageAsset: string[];
  children?: React.ReactNode;
}

export default function AppCard({ imageAsset, children }: AppCardProps) {
  return (
    <div className="appcard-container">
      <Card
        hoverable
        style={{ width: 286 }}
        cover={
          <>
            {imageAsset.length === 0 && (
              <div
                style={{
                  width: 286,
                  height: 163,
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "8px 8px 0 0",
                  backgroundColor: "#f94144",
                  opacity: "0.15",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Image
              </div>
            )}
            {imageAsset.length > 0 && (
              <Carousel afterChange={() => console.log("test")}>
                {imageAsset &&
                  imageAsset.map((image, index) => {
                    return (
                      <div
                        key={`${image.length}-${index}`}
                        style={{
                          ...contentStyle,
                        }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: 163,
                            objectFit: "cover",
                            objectPosition: "center",
                            borderRadius: "8px 8px 0 0",
                          }}
                          alt={image}
                          src={image}
                        />
                      </div>
                    );
                  })}
              </Carousel>
            )}
          </>
        }
      >
        {children}
      </Card>
    </div>
  );
}
