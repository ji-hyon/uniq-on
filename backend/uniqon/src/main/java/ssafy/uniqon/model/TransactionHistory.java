package ssafy.uniqon.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistory {
    @Id
    @GeneratedValue
    @Column(name="tx_history_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name="wallet_address")
    private Members seller;

    @ManyToOne
    @JoinColumn(name="wallet_address")
    private Members buyer;
}
